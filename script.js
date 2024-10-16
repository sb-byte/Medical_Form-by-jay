// script.js

// Initialize booked appointments to an empty array for new users
let bookedAppointments = [];

// Function to save the profile information
function saveProfile() {
    const formElements = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        temperature: document.getElementById("temperature").value,
        symptoms: document.getElementById("symptoms").value
    };

    // Display the saved profile information
    updateProfileDisplay(formElements);

    // Show the profile display section
    document.getElementById("profileDisplay").style.display = "block";

    // Clear the form fields
    document.getElementById("healthForm").reset();
    
    // Clear booked appointments for new user session
    bookedAppointments = [];
    localStorage.removeItem('bookedAppointments'); // Clear local storage for appointments
}

// Function to update profile display
function updateProfileDisplay(profileData) {
    for (const [key, value] of Object.entries(profileData)) {
        document.getElementById(`display${capitalizeFirstLetter(key)}`).textContent = value;
    }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to update available time slots based on selected doctor and date
function updateTimeSlots() {
    const doctor = document.getElementById("doctor").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const timeSlots = document.getElementById("timeSlots");

    timeSlots.innerHTML = ""; // Clear previous time slots

    // Example time slots (this logic can be modified based on real data)
    const availableSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"];
    
    availableSlots.forEach(slot => {
        const row = createTimeSlotRow(slot, doctor, appointmentDate);
        timeSlots.appendChild(row);
    });
}

// Function to create a time slot row
function createTimeSlotRow(slot, doctor, date) {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    const availabilityCell = document.createElement("td");

    timeCell.textContent = slot;
    availabilityCell.innerHTML = `<button onclick="bookAppointment('${doctor}', '${date}', '${slot}')">Book</button>`;

    row.appendChild(timeCell);
    row.appendChild(availabilityCell);
    return row;
}

// Function to book an appointment
function bookAppointment(doctor, date, time) {
    const appointment = { doctor, date, time };
    bookedAppointments.push(appointment);
    localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments)); // Save to local storage
    alert(`Appointment booked with ${doctor} on ${date} at ${time}.`);

    // Update the booked appointments display
    updateAppointmentList();
}

// Function to update the booked appointments list
function updateAppointmentList() {
    const appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = ""; // Clear previous appointments

    if (bookedAppointments.length === 0) {
        appointmentList.innerHTML = "<p>No appointments booked yet.</p>";
    } else {
        bookedAppointments.forEach(appointment => {
            const listItem = document.createElement("p");
            listItem.textContent = `${appointment.doctor} - ${appointment.date} at ${appointment.time}`;
            appointmentList.appendChild(listItem);
        });
    }
}

// Call to display the appointment list when the page loads
document.addEventListener('DOMContentLoaded', updateAppointmentList);
