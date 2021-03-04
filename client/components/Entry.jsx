/* eslint-disable indent */
import React from 'react';

const Entry = ({
  info
}) => {
  
  const {shot, bgX, bgLabel, time, notes, iob, graph, displayLine, onsetLag, middlePeak, bgDisplay, basalColor} = info;
  
  
  let bg = info.bg;
  bg = Math.round(bg);
  // console.log('bg in entry: ', bg);
  // if (bg === null) console.log('trueee');
  // if (displayLine > 1160) bg = 10;
  
  let iobDisplay = iob;
  if (onsetLag && (!iob || iob < .2)) iobDisplay = .1;
  
  const bgWidth = bg + 'px';
  const spaceWidth = (400 - bg) + 'px';
  const iobWidth = (iobDisplay * 50) + 'px';
  
  const bgWrite = bgDisplay ? bg > 50 ? (bg + ' ' + bgLabel + ' ') : bg > 10 ? (bg + ' ') : '\u00A0' : '\u00A0';
  
  // const bgWrite = bgDisplay ? bg ? (' ' + bg + ' ' + bgLabel + ' ') : '' : '';
  
  // const smallBgWrite = bgDisplay ? bg <= 50 ? bg ? (bg + ' ' + bgLabel + ' ') : '\u00A0' : '\u00A0' : '\u00A0';
  
  let output = ' ';
  let textColor = 'black';
  
  if (!graph) {
    if (shot < 0) {
      output += `(${shot * -1} units basal at ${time})`;
      textColor = 'red';
    } else {
      output += shot ? shot + ' ' : '';
      output += bg ? bg + ' ' + bgLabel + ' ' : '';
      output += time + ' ';
      output += notes ? notes + ' ' : '';
    }
  } else if (displayLine % 60 === 0 && iob) {
    output += displayLine + ' ';
  } 
  
  if (graph && middlePeak) {
    output += Math.round(iob) + ' I.O.B. ';
  }
  
  // compression factor
  if (graph && displayLine % 10 !== 0 && !middlePeak) {
    return null;
  }
  
  // const spaceBar = smallBgWrite.length ? <span className='spaceBar' style={{width: spaceWidth}}>{smallBgWrite}</span> : <span className='spaceBar' style={{width: spaceWidth}}></span>;
  
  const spaceBar = <span className='spaceBar' style={{width: spaceWidth}}></span>;
  
  // const bgBar = bgWrite.length ? <span className='bgBar' style={{width: bgWidth}}>{bgWrite}</span> : <span className='bgBar' style={{width: bgWidth}}>&nbsp</span>; 
  
  let bgBar;
  if (bg > 180) {
    const bgHigh = <span key='hi' className='bgBar' style={{width: (bg - 180) + 'px', backgroundColor: 'brown'}}>{'\u00A0'}</span>;
    const bgLow = <span key='lo' className='bgBar' style={{width: '180px'}}>{bgWrite}</span>;
    bgBar = [bgHigh, bgLow]; 
  } else {
    bgBar = <span className='bgBar' style={{width: bgWidth}}>{bgWrite}</span>; 
  }
  
  const displayText = <span className='displayText' style={{color: textColor}}>{output}</span>;
  
  // const midLineColor = basalRed ? 'red' : 'black';
  
  return (
    <div>
    {/* <span className='spaceBar' style={{width: spaceWidth}}>{smallBgWrite}</span>  */}
    {spaceBar}
    {bgBar}
    {/* <span className='displayText'>{bgWrite}</span> */}
    {/* <span className='bgBar' style={{width: bgWidth}}>{bgWrite}</span>  */}
    {/* <span className='spaceBar' style={{width:'10px', backgroundColor:'black'}}></span>  */}
    <span className='spaceBar' style={{width: '10px', backgroundColor: basalColor}}></span> 
    
    <span className='iobBar' style={{width: iobWidth}}></span> 
    {/* <span className='displayText'>{output}</span> */}
    {displayText}
    </div>
    );
  };
  
  export default Entry;
  
  
  
  
  
  // info = {shot: -20, bg: 108, bgLabel: 'wal', time: 560, notes: 'yehah', iob: 6.1, graph: false, displayLine: 80, onsetLag: false, middlePeak: false, bgDisplay: true};
  
  
