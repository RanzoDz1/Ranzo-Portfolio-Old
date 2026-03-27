const formData = new FormData();
formData.append("name", "Test User (Verified)");
formData.append("email", "test@example.com");
formData.append("form-name", "contact");
formData.append("message", "Testing the verified domain: notifications@send.ranzodz.com");

fetch("http://localhost:3000/api/submit", {
    method: "POST",
    body: formData
})
    .then(res => res.json())
    .then(data => console.log("Response:", data))
    .catch(err => console.error("Error:", err));
