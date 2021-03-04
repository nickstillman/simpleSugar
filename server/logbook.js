const fs = require('fs');

let writeLocation;
let marketList;

if (process.env.NODE_ENV === 'test') {
  writeLocation = `${__dirname}/markets.test.json`;
  marketList = JSON.parse(fs.readFileSync(writeLocation));
} else {
  writeLocation = `${__dirname}/markets.dev.json`;
  marketList = JSON.parse(fs.readFileSync(writeLocation));
}

const db = {};

db.sync = (markets) => {
  if (!Array.isArray(markets)) {
    return new Error(`Market list must be an array, received ${typeof markets}`);
  }
  if (markets.some(m => m.location === undefined || m.cards === undefined)) {
    return new Error('Missing fields on some markets');
  }
  if (markets.some(m => {
    return typeof m.location !== 'string' || typeof m.cards !== 'number';
  })) {
    return new TypeError('TypeError');
  }
  
  db.write(markets);
  db.reset();
  return marketList;
};


db.find = () => {
  db.reset();
  return marketList;
}


db.drop = () => {
  marketList = [];
  db.write(marketList);
};


db.write = (data) => {
  fs.writeFileSync(writeLocation, JSON.stringify(data, null, 2));
};


db.reset = () => {
  marketList = JSON.parse(fs.readFileSync(writeLocation));
};


module.exports = db;


