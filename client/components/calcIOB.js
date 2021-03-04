
// iob function

export function calcIOB(entriesObj) {
  
  const entries = Object.keys(entriesObj);
  
  const iobMap = [];
  let entriesIndex = 0;
  let basalGiven = false;
  let basalRed = false;
  let basalTime = null;
  
  while (entriesIndex < entries.length) {
    const entry = entriesObj[entries[entriesIndex]];
    if (entry.time > 1020 && !basalGiven) basalRed = true;
    if (entry.shot > 0) {
      // add onset lag
      let insertWaveIndex = entry.time + 40;
      
      let currentIOB = 0;
      const growth = entry.shot / 10;
      
      // add iob growth to current map
      while (insertWaveIndex < entry.time + 90) {
        currentIOB += growth;
        iobMap[insertWaveIndex] = iobMap[insertWaveIndex] + currentIOB || currentIOB;
        insertWaveIndex += 5;
      }
      
      // add iob peak to map
      // currentIOB = entry.shot;
      insertWaveIndex = entry.time + 90;
      
      while (insertWaveIndex < entry.time + 110) {
        iobMap[insertWaveIndex] = iobMap[insertWaveIndex] + currentIOB || currentIOB;
        insertWaveIndex += 5;
      }
      
      const decline = entry.shot / 26;
      insertWaveIndex = entry.time + 110;
      // add iob dropoff to map
      
      while (insertWaveIndex < entry.time + 240) {
        currentIOB -= decline;
        iobMap[insertWaveIndex] = iobMap[insertWaveIndex] - decline || currentIOB;
        insertWaveIndex += 5;
      }
    } else if (entry.shot < 0) {
      basalGiven = true;
      basalRed = false;
      basalTime = basalTime || entry.time;
    }
    entriesIndex++;
  }
  return [iobMap, basalRed, basalTime];
}

// const entries = {220: {shot: 3, bg: 98, time: 220, notes: 'small breakfast'}, 300: {bg: 128, time: 300, notes: 'bite PB'}, 580: {shot: 6, bg: 108, time: 580, notes: 'big lunch'}, 760: {shot: 5, bg: 250, time: 760, notes: 'high BS'}, 1140: {shot: -20, time: 1140}, 1160: {shot: 2, bg: 140, time: 1160, notes: null}};

// const entries = [{shot: 3, bg: 98, time: 220, notes: 'small breakfast'}, {shot: 10, bg: 128, time: 300, notes: 'bite PB'}, {shot: 6, bg: 108, time: 580, notes: 'big lunch'}, {shot: 5, bg: 250, time: 760, notes: 'high BS'}, {shot: -20, time: 1140}, {shot: 2, bg: 140, time: 1160, notes: null}];

// const iobs = calcIOB(entries);

// iobs.forEach((el, i) => console.log(el, 'at ', i));




// **** blood sugar functions

// export function calcBgChange(time) {

// }


export function makeBgTestMap(entriesObj) {
  const entries = Object.keys(entriesObj);
  
  const testMap = [];
  // create initial blood sugar from previous day?
  // for now, default UNICORN
  if (entriesObj[entries[0]]['time'] || !entriesObj[entries[0]]['bg']) {
    testMap.push({bgTarget: 100, nextBgTime: 0});
  }
  
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i];
    if (entriesObj[key]['bg'] > 19) {
      testMap.push({bgTarget: entriesObj[key]['bg'], nextBgTime: entriesObj[key]['time']});
    }
  }
  
  return testMap;
}





// export default calcIOB;

