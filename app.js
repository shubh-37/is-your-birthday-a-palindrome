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

function clickHandler(){
    var date = {
        day: 23,
        month: 12,
        year: 2019
    }
}

checkBtn.addEventListener("click",clickHandler);