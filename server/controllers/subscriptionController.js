import { pool } from "../config/db.js";

// Subscription plans
const PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Basic career exploration",
      "Limited assessment",
      "View top 3 recommendations",
    ],
  },
  basic: {
    name: "Basic",
    price: 499,
    features: [
      "Full career library",
      "Complete assessments",
      "Top 10 recommendations",
      "Skill gap analysis",
      "Course recommendations",
    ],
  },
  premium: {
    name: "Premium",
    price: 999,
    features: [
      "Everything in Basic",
      "Personalized roadmaps",
      "PDF reports",
      "2 counselling sessions",
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 2499,
    features: [
      "Everything in Premium",
      "Unlimited counselling",
      "Career tracking",
      "Custom assessments",
      "Dedicated counselor",
    ],
  },
};

// @desc    Get subscription plans
// @route   GET /api/subscriptions/plans
// @access  Public
export const getPlans = async (req, res) => {
  try {
    res.json({ plans: PLANS });
  } catch (error) {
    console.error("Get plans error:", error);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// @desc    Get user's current subscription
// @route   GET /api/subscriptions/current
// @access  Private
export const getCurrentSubscription = async (req, res) => {
  try {
    const [subscriptions] = await pool.query(
      "SELECT * FROM subscriptions WHERE user_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1",
      [req.user.id, "active"],
    );

    if (subscriptions.length === 0) {
      return res.json({ subscription: null, plan: PLANS.free });
    }

    const subscription = subscriptions[0];
    const plan = PLANS[subscription.plan_type] || PLANS.free;

    res.json({ subscription, plan });
  } catch (error) {
    console.error("Get current subscription error:", error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

// @desc    Subscribe to a plan
// @route   POST /api/subscriptions/subscribe
// @access  Private
export const subscribe = async (req, res) => {
  try {
    const { plan_type, payment_id } = req.body;

    if (!plan_type || !PLANS[plan_type]) {
      return res.status(400).json({ error: "Invalid plan type" });
    }

    if (plan_type !== "free" && !payment_id) {
      return res
        .status(400)
        .json({ error: "Payment ID required for paid plans" });
    }

    // Expire current subscription
    await pool.query(
      "UPDATE subscriptions SET status = ? WHERE user_id = ? AND status = ?",
      ["expired", req.user.id, "active"],
    );

    // Create new subscription
    const plan = PLANS[plan_type];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const [result] = await pool.query(
      `INSERT INTO subscriptions 
       (user_id, plan_type, start_date, end_date, status, payment_id, amount, currency) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        plan_type,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0],
        "active",
        payment_id || null,
        plan.price,
        "INR",
      ],
    );

    res.status(201).json({
      message: "Subscription created successfully",
      subscription_id: result.insertId,
      plan: plan,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
};
