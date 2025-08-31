window.onload = function() {
    let userInput = document.getElementById("date");
    userInput.max = new Date().toISOString().split('T')[0]; // Set the max date to today's date
};

function calculateAge() {
    let birthDate = document.getElementById("date").value; // yyyy-mm-dd
    let birthTime = document.getElementById("time").value; // hh:mm

    // If time input is empty, set it to 00:00 (midnight)
    if (!birthTime) {
        birthTime = "00:00"; // Default time if none provided
    }

    // Check if birthDate is empty
    if (!birthDate) {
        document.getElementById("result").innerHTML = "Please enter your birth date!";
        return; // Exit function if birthdate is not entered
    }

    // Combine the date and time to create a full Date object
    let birthDateTime = new Date(birthDate + 'T' + birthTime); // Format: yyyy-mm-ddThh:mm

    let today = new Date(); // Current date and time

    let y1 = birthDateTime.getFullYear();
    let m1 = birthDateTime.getMonth();
    let d1 = birthDateTime.getDate();
    let h1 = birthDateTime.getHours();
    let min1 = birthDateTime.getMinutes();
    let s1 = birthDateTime.getSeconds();

    let y2 = today.getFullYear();
    let m2 = today.getMonth();
    let d2 = today.getDate();
    let h2 = today.getHours();
    let min2 = today.getMinutes();
    let s2 = today.getSeconds();

    let y3 = y2 - y1;
    let m3 = m2 >= m1 ? m2 - m1 : (y3--, 12 + m2 - m1);
    let d3 = d2 >= d1 ? d2 - d1 : (m3--, getDaysInMonth(y2, m2 - 1) + d2 - d1);
    
    let hours = 0, minutes = 0, seconds = 0;

    // If time is provided, calculate hours, minutes, and seconds
    if (birthTime !== "00:00") {
        hours = h2 - h1;
        minutes = min2 - min1;
        seconds = s2 - s1;

        // If seconds, minutes, or hours are negative, adjust them
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            d3--;
        }
    }

    // Constructing the result string
    let resultString = "";

    if (y3 > 0) resultString += `${y3} years`;
    if (m3 > 0) resultString += resultString.length > 0 ? `, ${m3} months` : `${m3} months`;
    if (d3 > 0) resultString += resultString.length > 0 ? ` and ${d3} days` : `${d3} days`;

    // Only add time-related info if time is provided
    if (birthTime !== "00:00") {
        if (hours > 0) resultString += resultString.length > 0 ? `, ${hours} hours` : `${hours} hours`;
        if (minutes > 0) resultString += resultString.length > 0 ? `, ${minutes} minutes` : `${minutes} minutes`;
        if (seconds > 0) resultString += resultString.length > 0 ? ` and ${seconds} seconds` : `${seconds} seconds`;
    }

    // Display the result
    document.getElementById("result").innerHTML = `You are ${resultString} old.`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
