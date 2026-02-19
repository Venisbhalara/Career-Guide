const BASE_URL = "http://localhost:5000/api/courses";

async function testEndpoint(name, params = "") {
  try {
    const url = `${BASE_URL}${params ? `?${params}` : ""}`;
    console.log(`Testing ${name}: ${url}`);

    // Use dynamic import if needed, or assume global fetch with Node 18+
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ ${name} failed:`, data.error);
      return false;
    }

    console.log(
      `✅ ${name} success. Found ${data.courses ? data.courses.length : 0} courses.`,
    );
    if (data.pagination) {
      console.log(
        `   Pagination: Total ${data.pagination.total}, Page ${data.pagination.page}/${data.pagination.pages}`,
      );
    }
    return true;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.error(
        `❌ ${name} failed: Server not running on ${BASE_URL}. Ensure server is started on port 5000.`,
      );
    } else {
      console.error(`❌ ${name} error:`, error.message);
    }
    return false;
  }
}

async function runTests() {
  console.log("Starting Course Verification...");

  // 1. Get all courses
  await testEndpoint("Get All Courses");

  // 2. Search for 'Python'
  await testEndpoint("Search Python", "search=Python");

  // 3. Filter by Platform 'Udemy'
  await testEndpoint("Filter Platform Udemy", "platform=Udemy");

  // 4. Filter by Difficulty 'beginner'
  await testEndpoint("Filter Beginner", "difficulty=beginner");

  // 5. Filter by Price 'Free'
  await testEndpoint("Filter Free", "is_free=true");

  // 6. Combined Filter
  await testEndpoint("Combined Filter", "platform=Udemy&difficulty=beginner");

  console.log("Verification Complete.");
}

runTests();
