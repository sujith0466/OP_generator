document.getElementById("opForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;
    const symptom = document.getElementById("symptom").value;
    const gender = document.getElementById("gender").value;

    const response = await fetch("https://op-backend-wh2q.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, mobile, symptom, gender })
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "OP_Sheet.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
    } else {
        const error = await response.json();
        document.getElementById("message").textContent = error.error;
    }
});
