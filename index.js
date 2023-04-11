function extractDate(dateString) {
  const [yearStr, monthStr, dayStr] = dateString.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  return { year, month, day };
}

// 1 Jan 1970 was Thursday. The logic is that first we decide how many days are between given date and 1 Jan 1970.
function solve(D) {
  let monthSum = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let ans = [0, 0, 0, 0, 0, 0, 0];
  let vis = [0, 0, 0, 0, 0, 0, 0];
  for (let key in D) {
    const { year, month, day } = extractDate(key);
    let total_days = 0;
    //console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
    for (let i = 1970; i < year; i++) {
      if (i % 4 == 0) total_days += 366;
      else total_days += 365;
    }
    if (year % 4 == 0) month[2] = 29;
    else month[2] = 28;
    for (let i = 0; i < month; i++) total_days += monthSum[i];
    total_days += day;
    total_days %= 7;
    // Currently 0 corresponds to Thursday. But it is 4-th day of the week.
    total_days += 2;
    total_days %= 7;
    //console.log(total_days);
    ans[total_days] += D[key];
    vis[total_days] = 1;
  }
  let i = 0;
  //We are sure that i=0[MONDAY] and i=6[SUNDAY] are always visited
  while (i < 7) {
    let j = i + 1;
    while (j < 7) {
      if (vis[j] == 1) break;
      else j++;
    }
    //i+1 to j-1 are not visited. So we have to fill these values
    //We have an Arithmetic Progression[AP]. First element is ans[i] and (j-i+1)-th element is ans[j]
    //Common Difference(d)=(ans[j]-ans[i])/(j-i)
    //Since Assumption include that all the corresponding values are integers so our d will also be an integer
    let d = (ans[j] - ans[i]) / (j - i);
    for (let k = i + 1; k < j; k++) ans[k] = ans[i] + (k - i) * d;
    i = j;
  }
  console.log("Mon: " + ans[0]);
  console.log("Tue: " + ans[1]);
  console.log("Wed: " + ans[2]);
  console.log("Thu: " + ans[3]);
  console.log("Fri: " + ans[4]);
  console.log("Sat: " + ans[5]);
  console.log("Sun: " + ans[6]);
}

// Main program
/**
 * Just Run node index.js into the terminal.
 * Here I am taking the input from the terminal. 
 * Sample Input would be like:
        2020-01-01 4
        2020-01-02 4
        2020-01-03 6
        2020-01-04 8
        2020-01-05 2
        2020-01-06 -6
        2020-01-07 2
        2020-01-08 -2
 * Sample Output would be like:
        Mon: -6
        Tue: 2
        Wed: 2
        Thu: 4
        Fri: 6
        Sat: 8
        Sun: 2

 * If you wish to directly initialise the dictionary you may remove the below lines and write this
        const D = {
        '2022-01-01': 10,
        '2022-01-02': 20,
        '2022-01-03': 30,
        };
        solve(D);
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numValues;
const dict = {};

rl.question("How many values do you want to input? ", function (answer) {
  numValues = parseInt(answer);
  rl.prompt();
});

rl.on("line", function (input) {
  if (numValues > 0) {
    const [date, value] = input.split(" ");
    dict[date] = parseInt(value);
    numValues--;
    if (numValues === 0) {
      rl.close();
      solve(dict);
    } else {
      rl.prompt();
    }
  }
});
