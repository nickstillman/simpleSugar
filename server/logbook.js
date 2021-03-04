const fs = require('fs');


const logIndexPath = `${__dirname}/logIndex.json`;
const logIndex = JSON.parse(fs.readFileSync(logIndexPath));

const db = {};

db.sync = (dayLog) => {
  db.write(markets);
  db.reset();
  return marketList;
};


db.read = (logDate) => {
  if (db.checkIndex(logDate)) {
    const logDatePath = `${__dirname}/${logDate}.json`
    const data = JSON.parse(fs.readFileSync(logDatePath));
    return data;
  }
  
  return 'Date not found';
}

db.checkIndex = (logDate) => {
  for (const date of logIndex) {
    if (date === logDate) return true;
  }
  return false;
}

db.drop = () => {
  marketList = [];
  db.write(marketList);
};


db.write = (data) => {
  // fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
  fs.writeFileSync(logPath, JSON.stringify(data));
  
};


// db.reset = () => {
//   marketList = JSON.parse(fs.readFileSync(logPath));
// };


module.exports = db;


