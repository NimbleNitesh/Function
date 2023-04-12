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
  let res = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
  res["Mon"]=ans[0];
  res["Tue"]=ans[1];
  res["Wed"]=ans[2];
  res["Thu"]=ans[3];
  res["Fri"]=ans[4];
  res["Sat"]=ans[5];
  res["Sun"]=ans[6];
  return res;
}

// Main program
/**

 * If you wish to directly initialise the dictionary you may remove the below lines and write this
        const D = {
        '2022-01-01': 10,
        '2022-01-02': 20,
        '2022-01-03': 30,
        };
        solve(D);
 */

module.exports=solve;
