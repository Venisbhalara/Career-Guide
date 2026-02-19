const testRegistration = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "node_test_user_" + Date.now() + "@example.com",
        password: "password123",
        full_name: "Node Test User",
        phone: "1234567890",
      }),
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("✓ Registration endpoint working correctly");
    } else {
      console.error("✗ Registration endpoint failed");
    }
  } catch (error) {
    console.error("✗ Error testing endpoint:", error);
  }
};

testRegistration();
