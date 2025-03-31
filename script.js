const diseaseMap = {
    "Fever": "General Medicine",
    "Chest Pain": "Cardiology",
    "Stomach Pain": "Gastroenterology",
    "Headache": "Neurology",
    "Skin Rash": "Dermatology"
};

const doctorsMap = {
    "General Medicine": ["Dr. Smith (General Medicine)", "Dr. Johnson (General Medicine)", "Dr. Lee (General Medicine)"],
    "Cardiology": ["Dr. Brown (Cardiologist)", "Dr. Davis (Cardiologist)", "Dr. Wilson (Cardiologist)"],
    "Gastroenterology": ["Dr. Taylor (Gastroenterologist)", "Dr. Anderson (Gastroenterologist)", "Dr. Thomas (Gastroenterologist)"],
    "Neurology": ["Dr. Jackson (Neurologist)", "Dr. White (Neurologist)", "Dr. Harris (Neurologist)"],
    "Dermatology": ["Dr. Martin (Dermatologist)", "Dr. Thompson (Dermatologist)", "Dr. Garcia (Dermatologist)"]
};

function updateDoctors() {
    const symptom = document.getElementById("symptom").value;
    const doctorSelect = document.getElementById("doctor");
    doctorSelect.innerHTML = "";

    const department = diseaseMap[symptom];
    const doctors = doctorsMap[department];

    doctors.forEach(doctor => {
        let option = document.createElement("option");
        option.textContent = doctor;
        doctorSelect.appendChild(option);
    });
}

document.getElementById("opForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const mobile = document.getElementById("mobile").value;
    const symptom = document.getElementById("symptom").value;
    const gender = document.getElementById("gender").value;
    const doctor = document.getElementById("doctor").value;
    const appointment = document.getElementById("appointment").value;

    try {
        const response = await fetch("https://op-backend-wh2q.onrender.com/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, mobile, symptom, gender, doctor, appointment })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    } catch (error) {
        console.error("Error:", error);
    }
});
