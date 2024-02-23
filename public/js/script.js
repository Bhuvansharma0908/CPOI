import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, push, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCakd0X99bzxh7cBT9bJpgpUqQH5r9RTHw",
    authDomain: "cpio-a3555.firebaseapp.com",
    databaseURL: "https://cpio-a3555-default-rtdb.firebaseio.com",
    projectId: "cpio-a3555",
    storageBucket: "cpio-a3555.appspot.com",
    messagingSenderId: "723085907473",
    appId: "1:723085907473:web:28c977e4e7deb8156a83b0",
    measurementId: "G-5NRP1HWVFE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    document.querySelector(".container").classList.add("loading");

    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Check if checkout date is greater than check-in date
    const checkInDate = new Date(formObject["checkInDate"]);
    const checkOutDate = new Date(formObject["checkOutDate"]);
    if (checkOutDate <= checkInDate) {
        alert("Checkout date must be greater than check-in date");
        document.querySelector(".container").classList.remove("loading");
        return; // Exit submission process
    }
    const phoneNumber = formObject["phone"];
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Phone number must be exactly 10 digits");
        document.querySelector(".container").classList.remove("loading");
        return; // Exit submission process
    }

    // Save form data to Firebase Realtime Database
    push(ref(database, 'bookings'), formObject)
        .then(() => {
            // Hide loader
            alert("Form Submitted Successfully");
            document.querySelector(".container").classList.remove("loading");
            window.location = "https://chandigarhpolice.gov.in/";

        })
        .catch(error => {
            console.error("Error adding document: ", error);
            alert("An error occurred while submitting the form. Please try again later.");
        });
});