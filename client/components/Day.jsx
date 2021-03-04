/* eslint-disable no-empty */
/* eslint-disable indent */
import React, { Component } from 'react';

import Entry from './Entry.jsx';
// import * as bgFuncs from './getBloodSugars';
import * as calcFuncs from './calcIOB.js';
// import DetailsModal from './DetailsModal';

const Day = (props) => {
  let err;
  let entries;
  
  if (!props.fetchedEntries) {
    err = 'Loading...'
  } else {
    ({ entries } = props);
  }
  if (!entries) {
    err = 'No entries found';
  } else if (!Object.keys(entries).length) {
    err = 'No entries found';
  }
  
  if (err) {
    return (
      <section className="mainSection">
      <header className="pageHeader">
      <h2 className="date">{props.displayDate}, {props.displayTime}</h2>
      <br></br>
      <br></br>
      </header>
      <div className="entriesContainer">
      {err}
      </div>
      <div id='bottom'>
      <br></br>
      <br></br>
      </div>
      </section>
      );
    }
    
    const entryList = [];
    
    // iterate through entries and map blood sugar readings from tests
    // stored as keys on objects in array
    const bgTestMap = calcFuncs.makeBgTestMap(entries);
    let bgMapIndex = 0;
    let prevBgTime = 0;
    
    let {bgTarget, nextBgTime} = bgTestMap[0];
    
    let prevBg = bgTarget;
    let currentSlope = 0;
    
    
    // build IOB map, iterate through entries and create IOB waveforms
    
    const iobMapBasal = calcFuncs.calcIOB(entries);
    const iobMap = iobMapBasal[0];
    const basalRed = iobMapBasal[1];
    const basalTime = iobMapBasal[2];
    
    // console.log('basalred:', basalRed);
    // console.log('basalTime:', basalTime);
    
    // push entries to entryList
    let onsetLag = false;
    let middlePeak = false;
    let nextMiddlePeak = null;
    let nextOnset = null;
    
    for (let i = 0; i < iobMap.length; i += 5){
      let entry = null;
      
      middlePeak = (i === nextMiddlePeak);
      nextMiddlePeak = middlePeak ? null : nextMiddlePeak;
      
      if (entries[i]) {
        entry = entries[i];
        entry.iob = iobMap[i];
        entry.graph = false;
        entry.onsetLag = onsetLag;
        if (entry.shot > 0) {
          nextOnset = entry.time + 40;
          nextMiddlePeak = entry.time + 100;
          onsetLag = true;
        }
      } else { //if (iobMap[i] || onsetLag) {
        entry = {iob: iobMap[i], graph: true, onsetLag, middlePeak, displayLine: i};
      }
      
      onsetLag = (nextOnset && i < nextOnset);
      nextOnset = onsetLag ? nextOnset : null;
      
      // calculate current blood glucose
      if (entry) {
        if (bgTarget) {
          // console.log('bgtarget:', bgTarget);
          // console.log('nextBgTime:', nextBgTime);
          
          if (i < nextBgTime) {
            prevBg += currentSlope;
          } else if (i === nextBgTime) {
            prevBg = bgTarget;
            prevBgTime = i;
            bgMapIndex++;
            if (bgMapIndex < bgTestMap.length) {
              ({bgTarget, nextBgTime} = bgTestMap[bgMapIndex]);
            } else {
              bgTarget = null, nextBgTime = null;
            }
            if (bgTarget) {
              currentSlope = (bgTarget - prevBg) / ((nextBgTime - prevBgTime) / 5);
            }
          }
          entry.bg = entry.bg || prevBg;
        } else entry.bg = 0;
      }
      
      
      // // diagnostic
      // if (i > 0) {
      //   if (entry) {
      //     console.log('at ', i, 'bg is ', entry.bg);
      //   } else console.log('NOPE: ', entry);
      // }
      
      // attach bg test device label and display flag
      if (entry) {
        entry.bgDisplay = !!entry.time;
        entry.bgLabel = entry.bgLabel || '';
        entry.basalColor = basalRed && i > 1020 ? 'red' : i >= basalTime & basalTime ? 'yellow' : 'black'; 
      }
      
      
      // create entry component
      if (entry) {
        entryList.push(
          <Entry
          key={i}
          info={entry}
          />
          ); 
        }
      }
      
      const dateColor = props.onToday ? 'red' : 'black';
      const dateTime = props.displayDate + (props.onToday ? (', ' + props.displayTime) : '');
      const displayDateTime = <h2 className="date" style={{color: `${dateColor}`}}>{dateTime}</h2>
      
      return (
        <section className="mainSection">
        <header className="pageHeader">
        {/* <h2 className="date">{props.displayDate}, {props.displayTime}</h2> */}
        {displayDateTime}
        <br></br>
        <br></br>
        </header>
        <div className="entriesContainer">
        {entryList}
        </div>
        <div id='bottom'>
        <br></br>
        <br></br>
        </div>
        </section>
        );
        
      }
      
      export default Day;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      // openModal(type, position, id) {
      //   this.setState({
      //     modalState: {
      //       ...this.state.modalState,
      //       open: true,
      //       type,
      //       position,
      //       id
      //     }
      //   });
      // }
      
      // closeModal() {
      //   this.setState({
      //     modalState: {
      //       ...this.state.modalState,
      //       open: false
      //     }
      //   });
      // }
      
      
      
      
      
      // modalState: {
      //   open: false,
      //   type: null,
      //   position: { top: 0, left: 0 },
      //   id: null
      
