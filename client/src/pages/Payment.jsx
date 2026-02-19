import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedUpi, setSelectedUpi] = useState(null);

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const { selectedPlan, billingCycle } = location.state || {};

  const planDetails = selectedPlan
    ? {
        id: selectedPlan,
        name:
          selectedPlan === "pro"
            ? "Professional"
            : selectedPlan === "premium"
              ? "Premium"
              : "Explorer",
        price:
          selectedPlan === "pro"
            ? billingCycle === "yearly"
              ? 290
              : 29
            : selectedPlan === "premium"
              ? billingCycle === "yearly"
                ? 790
                : 79
              : 0,
        cycle: billingCycle || "monthly",
      }
    : null;

  useEffect(() => {
    if (!selectedPlan && !user) navigate("/pricing");
  }, [selectedPlan, user, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful!");
      navigate("/dashboard");
    }, 2000);
  };

  // Card formatting helpers
  const formatCardNumber = (val) => {
    return val
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  if (!planDetails) return null;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-methods-container">
          <div className="payment-header">
            <h1 className="payment-title">Secure Checkout</h1>
            <p className="payment-subtitle">Complete your transaction safely</p>
          </div>

          <div className="payment-tabs">
            <button
              className={`payment-tab ${paymentMethod === "upi" ? "active" : ""}`}
              onClick={() => setPaymentMethod("upi")}
            >
              UPI / Apps
            </button>
            <button
              className={`payment-tab ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              Credit / Debit Card
            </button>
            <button
              className={`payment-tab ${paymentMethod === "netbanking" ? "active" : ""}`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              Net Banking
            </button>
          </div>

          <div className="payment-content">
            {paymentMethod === "card" && (
              <>
                {/* Visual Card */}
                <div className="card-visual">
                  <div className="card-visual-content">
                    <div className="card-top">
                      <div className="chip"></div>
                      <div className="card-brand">VISA</div>
                    </div>
                    <div className="card-number-display">
                      {cardNumber || "4321 0000 0000 0000"}
                    </div>
                    <div className="card-bottom">
                      <div className="holder-display">
                        <span className="label">Card Holder</span>
                        <span className="value">
                          {cardHolder || "YOUR NAME"}
                        </span>
                      </div>
                      <div className="expiry-display">
                        <span className="label">Expires</span>
                        <span className="value">{expiry || "MM/YY"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-form">
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="123"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Card Holder Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name on card"
                      value={cardHolder}
                      onChange={(e) => {
                        if (e.target.value.length <= 22)
                          setCardHolder(e.target.value.toUpperCase());
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="upi-section">
                <div className="upi-grid">
                  <div
                    className={`upi-option ${selectedUpi === "gpay" ? "selected" : ""}`}
                    onClick={() => setSelectedUpi("gpay")}
                  >
                    {/* Using placeholders or simple text if images break, but keeping existing logic */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
                      alt="GPay"
                      className="upi-icon"
                    />
                    <span className="upi-name">Google Pay</span>
                  </div>
                  <div
                    className={`upi-option ${selectedUpi === "phonepe" ? "selected" : ""}`}
                    onClick={() => setSelectedUpi("phonepe")}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png"
                      alt="PhonePe"
                      className="upi-icon"
                    />
                    <span className="upi-name">PhonePe</span>
                  </div>
                  <div
                    className={`upi-option ${selectedUpi === "paytm" ? "selected" : ""}`}
                    onClick={() => setSelectedUpi("paytm")}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/1200px-Paytm_Logo_%28standalone%29.svg.png"
                      alt="Paytm"
                      className="upi-icon"
                    />
                    <span className="upi-name">Paytm</span>
                  </div>
                </div>
                {selectedUpi && (
                  <div className="form-group">
                    <label className="form-label">Enter UPI ID</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="username@upi"
                    />
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="form-group">
                <label className="form-label">Select Your Bank</label>
                <select className="form-input">
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            <button
              className="btn-pay"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                `Pay ₹${planDetails.price}`
              )}
            </button>

            <div className="secure-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ marginRight: "6px" }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Secured by 256-bit SSL encryption
            </div>
          </div>
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <h2 className="summary-title">Order Summary</h2>
            <p className="summary-subtitle">Review your purchase</p>
          </div>

          <div className="plan-details">
            <span className="plan-name">{planDetails.name} Plan</span>
            <div className="text-right">
              <span className="plan-price">₹{planDetails.price}</span>
            </div>
          </div>
          <div
            className="plan-details"
            style={{ fontSize: "0.9rem", opacity: 0.7 }}
          >
            {planDetails.cycle === "yearly"
              ? "Billed Yearly"
              : "Billed Monthly"}
          </div>

          {planDetails.cycle === "yearly" && (
            <div className="plan-details" style={{ color: "#4ade80" }}>
              <span>Yearly Savings Applied</span>
              <span>-20%</span>
            </div>
          )}

          <div className="summary-total">
            <span className="total-label">Total</span>
            <span className="total-amount">₹{planDetails.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
