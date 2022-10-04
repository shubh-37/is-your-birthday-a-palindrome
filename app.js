var inputDate = document.querySelector(".input-date");
var checkBtn = document.querySelector("#check-btn");
var output = document.querySelector(".output");

// a function to reverse the string
function reverseStr(str){
    var splitStr = str.split("");
    var reversedArr = splitStr.reverse();
    var reverseStr = reversedArr.join("")
    
    return reverseStr;
}

//a function to check if the passed string is a palindrome or not
function isPalindrome(str){
    var revStr = reverseStr(str);
    if(str === revStr){
        return true;
    }else{
        return false;
    }
}

//a function to convert the numeral date into date in String
function dateToStr(date){
    var dateToStr = {
        day : "",
        month : "",
        year : ""
    }
// if the date is in single digit like 1,2,3... this will add a zero before it
    if(date.day < 10){
        dateToStr.day = "0" + date.day;
    }else{
        dateToStr.day = date.day.toString();
    }
// if the month is in single digit like 1,2,3... this will add a zero before it    
    if(date.month < 10){
        dateToStr.month = "0" + date.month;
    }else{
        dateToStr.month = date.month.toString();
    }
    dateToStr.year = date.year.toString();

    return dateToStr;
}

// a function to return an array of dates in all formats for the same date
function getAllDateFormats(date){
    var dateStr = dateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//a function to check the date against all the formats of dates and return true if the palindrome is found else return false
function checkPalindromeInAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false
    for (let i = 0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        } 
    }
    return flag;
}

// a function to check if a year is leap year or not
function isLeapYear(year){
    if(year%400 === 0){
        return true;
    }
    if(year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    return false;
}
// a function to get the next date from the present date in all possible cases
function getNextDay(date){
    var day = date.day + 1 ;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

// to check for the month of february    
    if(month === 2){
        //to check in the case of a leap year
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        // to check otherwise and increment the month by 1
        }else{
            if(date > 28){
                day = 1;
                month++;
            }
        }
    // if its last date of the month then increment the month by 1 and set the date to 1
    }else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    // if it is 31st december then change the month to january and increment the year by 1
    if(month > 12){
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}
//a function to get the next palindrome date using above function and also return in how many days does it occur from the current date
function getNextPalindromeDate(date){
    var counter = 0;
    var nextDay = getNextDay(date);

    while(1){
        counter++;
        var isPalindrome = checkPalindromeInAllDateFormats(nextDay);
        if(isPalindrome){
            break;
        }
        nextDay = getNextDay(nextDay);
    }
    return [nextDay, counter];
}
//logic part of the app i.e. putting all the above functions in a logical order
function clickHandler(){
    //taking input 
    var input = inputDate.value;
    //input validator
    if(input){
        var list = input.split("-");

    var date = {
        day : Number(list[2]),
        month : Number(list[1]),
        year : Number(list[0])
    }
    //processing the input
    var isPalindrome = checkPalindromeInAllDateFormats(date);

    if(isPalindrome){
        //rendering the output
        output.innerText = "Yay! your birthday is a Palindrome🥳";
    }else{
        //processing the input as well as rendering the output
        var [nextDay, counter] = getNextPalindromeDate(date);
        output.innerText = `The next palindrome date is ${nextDay.day}-${nextDay.month}-${nextDay.year} and you missed it by ${counter} days 😔`;
    }
    }else{
        //error handler
        output.innerText = "Please enter a date to check!!"
    }
    
}

checkBtn.addEventListener("click",clickHandler);