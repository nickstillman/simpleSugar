/* eslint no-unused-vars: 0 */
const path = require('path');
const express = require('express');
const db = require('./logbook');


const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;


app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('HIT THAT ROOT')
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.put('/entries', (req, res, next) => {
console.log('ABOUT TO PUT!!!', req.body);
  const putResult = db.insert(req.body);
  if (putResult instanceof Error) {
    return next({ code: 400, error: putResult });
  }
  res.json(putResult);
});

app.get('/entries', (req, res) => {
  console.log('HIT ENTRIES!!!!!');
  
  // const data = {
  //   "entries": {"date": {"month": 4, "day": 14, "year": 1979}, "220": {"shot": 3, "bg": 28, "bgLabel": "wal", "time": 220, "notes": "small breakfast"}, "300": {"bg": 328, "bgLabel": "", "time": 300, "notes": "bite PB"}, "580": {"shot": 6, "bg": 108, "bgLabel": "wal", "time": 580, "notes": "big lunch"}, "760": {"shot": 5, "bg": 250, "bgLabel": "", "time": 760, "notes": "high BS"}, "1140": {"shot": -15, "time": 1140}, "1160": {"shot": 2, "bg": 140, "bgLabel": "wal", "time": 1160, "notes": null}}
  // }
  
  const {date} = req.query;
  const data = db.read(date);
  console.log('data:', data)
  // if (typeof data === 'object') {
    res.status(200).json(data);
  // } else {
  //   res.status(200).json(data);
  // }
});

app.use(({ code, error }, req, res, next) => {
  res.status(code).json({ error });
});


// app.put('/markets', (req, res, next) => {
//   const syncResult = db.sync(req.body);
//   if (syncResult instanceof Error) {
//     return next({ code: 400, error: syncResult });
//   }
//   res.json(syncResult);
// });

// app.get('/markets', (req, res) => {
//   res.json(db.find());
// });

// app.use(({ code, error }, req, res, next) => {
//   res.status(code).json({ error });
// });

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));
