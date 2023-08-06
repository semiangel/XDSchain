const fs = require('fs');
const XLSX = require('xlsx');

// Read the contents of the file
const fileContents = fs.readFileSync('ConsumerResult.txt', 'utf8');

// Split the contents into rows and columns
const rows = fileContents.trim().split('\n');
const data = rows.map(row => row.split(' '));

// Create a new workbook
const workbook = XLSX.utils.book_new();

// Add a new worksheet to the workbook
const worksheet = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Write the workbook to a file
XLSX.writeFile(workbook, 'ConsumerResult.xlsx');
