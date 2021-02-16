var hrstart = process.hrtime();
var hrend = process.hrtime(hrstart);
console.log(hrend - hrstart);