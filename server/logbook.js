const fs = require('fs');


const logIndexPath = `${__dirname}/logIndex.json`;
logIndex = JSON.parse(fs.readFileSync(logIndexPath));

const db = {};

db.sync = (dayLog) => {
  db.write(markets);
  db.reset();
  return marketList;
};


db.read = (logDate) => {
  console.log(req.body);
  
  // db.reset();
  // return marketList;
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


