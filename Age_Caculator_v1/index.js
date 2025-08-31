let userInput = document.getElementById("date");
let today = new Date();
let yyyy = today.getFullYear();
let mm = String(today.getMonth() + 1).padStart(2, '0'); // Month 0-based hota hai
let dd = String(today.getDate()).padStart(2, '0'); // Current date

userInput.max = `${yyyy}-${mm}-${dd}`; // Set max attribute in YYYY-MM-DD format

// userInput.max = new Date().toISOString().split('T')[0];
let result = document.getElementById("result")

function calculateAge(){

    let birthDate = new Date(userInput.value);
    let today = new Date();

    // for birthdates
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1; //since it is 0 base indexing
    let y1 = birthDate.getFullYear();

    // for today date
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    //now to calculate the dated
    let d3, m3, y3;

    // for year

    y3 = y2 - y1;


    // for months

    if(m2 >= m1){
        // then do normal subtraction
        m3 = m2 - m1;
    }
    else{
        y3--;
        m3 = 12 + m2 - m1;
        // ye isliye ki agr m2(current) month chota hua to kaise minus karenge qki month negative me nahi hoti
    }

    //fot calculating days

    if(d2 >= d1){
        d3 = d2 - d1; //same as months
    }
    else{
        m3--;
        d3 = getDaysInMonth(y1,m1) + d2 - d1;
    }

    //condition to check if month is negetive
    if(m3 < 0){
        m3 = 11;
        y3--;
    }
    if(y3 < 0){
        y3 = 0;
    }


    let resultString = ""; // Initialize an empty string for the result

    if (y3 > 0) {
        resultString += `${y3} years`; // Add years if it's greater than 0
    }

    if (m3 > 0) {
        //Add comma or "and" dynamically if needed
        if (resultString.length > 0) resultString += ", ";
        resultString += `${m3} months`;
    }

    if (d3 > 0) {
        // Add comma or "and" dynamically if needed
        if (resultString.length > 0) resultString += " and ";
        resultString += `${d3} days`;
    }

    // Display the final result
    result.innerHTML = `You are ${resultString} old.`;

}

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();

    // Calculates the number of days in a specific month of a given year.
    // The value 0 is used to reference the last day of the previous month.
}