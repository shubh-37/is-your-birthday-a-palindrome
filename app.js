var checkBtn = document.querySelector("#check-btn");

function reverseStr(str){
    var splitStr = str.split("");
    var reversedArr = splitStr.reverse();
    var reverseStr = reversedArr.join("")
    
    return reverseStr;
}

function isPalindrome(str){
    var revStr = reverseStr(str);
    if(str === revStr){
        return true;
    }else{
        return false;
    }
}

function dateToStr(date){
    var dateToStr = {
        day : "",
        month : "",
        year : ""
    }

    if(date.day < 10){
        dateToStr.day = "0" + date.day;
    }else{
        dateToStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateToStr.month = "0" + date.month;
    }else{
        dateToStr.month = date.month.toString();
    }
    dateToStr.year = date.year.toString();

    return dateToStr;
}

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

function getNextDay(date){
    var day = date.day + 1 ;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }else{
            if(date > 28){
                day = 1;
                month++;
            }
        }
    }else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

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

function clickHandler(){
    
}

checkBtn.addEventListener("click",clickHandler);