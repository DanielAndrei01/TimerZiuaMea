
const yearEl=document.getElementById('years');
const monthsEl=document.getElementById('months');
const daysEl=document.getElementById('days');
const hoursEl=document.getElementById('hours');
const minutesEl=document.getElementById('minutes');
const secondsEl=document.getElementById('seconds');





const ziuaMea = 'Jul 11, 2002 00:00:00';

function countdown() {
  const dataZiuaMea = new Date(ziuaMea);
  const dataCurenta = new Date();

  const diffMilliseconds = dataCurenta - dataZiuaMea;

  // Calculate the total seconds difference
  const diffSeconds = Math.floor(diffMilliseconds / 1000);

  // Calculate the years
  const years = Math.floor(diffSeconds / (365 * 24 * 3600));
  
  // Calculate the remaining seconds after removing years
  const remainingSeconds = diffSeconds % (365 * 24 * 3600);
  
  // Calculate the number of leap years
  const leapYears = countLeapYears(dataZiuaMea.getFullYear(), dataCurenta.getFullYear());

  // Calculate the total days difference after removing years and leap years
  const totalDays = remainingSeconds / 86400 - leapYears;
  
  // Calculate the months and days
  const { months, days } = calculateMonthsAndDays(totalDays);

  // Calculate the remaining seconds after removing years, leap years, months, and days
  const remainingSecondsWithoutYearsMonthsDays = remainingSeconds % 86400;
  
  // Calculate the hours, minutes, and seconds
  const hours = Math.floor(remainingSecondsWithoutYearsMonthsDays / 3600);
  const minutes = Math.floor((remainingSecondsWithoutYearsMonthsDays % 3600) / 60);
  const seconds = remainingSecondsWithoutYearsMonthsDays % 60;
  const days1=Math.floor(days);
  console.log(years, months, days1, hours, minutes, seconds);



       yearEl.innerHTML=formatTime(years);
    monthsEl.innerHTML=formatTime(months);
    daysEl.innerHTML=formatTime(days1);
    hoursEl.innerHTML=formatTime(hours);
    minutesEl.innerHTML=formatTime(minutes);
    secondsEl.innerHTML=formatTime(seconds);
}

function countLeapYears(startYear, endYear) {
  let count = 0;
  for (let year = startYear; year <= endYear; year++) {
    if (isLeapYear(year)) {
      count++;
    }
  }
  return count;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function calculateMonthsAndDays(totalDays) {
  let months = 0;
  let days = 0;
  while (totalDays > 0) {
    const daysInMonth = getDaysInMonth(months);
    if (totalDays >= daysInMonth) {
      totalDays -= daysInMonth;
      months++;
    } else {
      days = totalDays;
      break;
    }
  }
  return { months, days };
}

function getDaysInMonth(month) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return new Date(year, month + 1, 0).getDate();
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
  }
setInterval(countdown, 1000);
countdown();