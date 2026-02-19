const testContactForm = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Inquiry",
        message:
          "This is a test message to verify the contact form integration with the database.",
      }),
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (response.ok) {
      console.log("✓ Contact form submission successful!");
    } else {
      console.log("✗ Contact form submission failed:", data.error);
    }
  } catch (error) {
    console.error("✗ Error testing contact form:", error.message);
  }
};

testContactForm();
