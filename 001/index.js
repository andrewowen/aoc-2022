const fs = require("fs");
const path = require("path");
const readline = require("readline");

const parseFile = async (fileName) => {
  const pathResolver = path.resolve(__dirname, fileName);
  const data = readline.createInterface({
    input: fs.createReadStream(pathResolver),
  });

  let numberArray = [];
  let tempCount = 0;

  for await (const line of data) {
    if (line.length === 0) {
      numberArray.push(tempCount);
      tempCount = 0;
    } else {
      tempCount += parseInt(line);
    }
  }
  numberArray.sort(function (a, b) {
    return b - a;
  });

  console.log(`Highest Calories: ${numberArray[0]}`);

  const top3 = numberArray.slice(0, 3).reduce((a, b) => a + b);
  console.log(`Top 3: ${top3}`);
};

parseFile("sample-data.txt");
