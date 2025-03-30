document.getElementById("opForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;
    const symptom = document.getElementById("symptom").value;
    const gender = document.getElementById("gender").value;

  fetch("https://op-backend-wh2q.onrender.com/generate", { // Replace with your actual backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, mobile, symptom, gender }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob(); // Expecting a PDF file as response
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Open PDF in a new tab
    })
    .catch(error => console.error("Error:", error));
});
