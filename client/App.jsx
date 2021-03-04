import React, { Component } from 'react';

import Input from './components/Input.jsx';
import Day from './components/Day.jsx';

import './stylesheets/styles.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedEntries: true,//false,
      // entries: [{shot: 3, bg: 98, time: 220, notes: 'small breakfast'}, {bg: 128, time: 300, notes: 'bite PB'}, {shot: 6, bg: 108, time: 580, notes: 'big lunch'}, {shot: 5, bg: 250, time: 760, notes: 'high BS'}, {shot: -20, time: 1140}, {shot: 2, bg: 140, time: 1160, notes: null}],//[],
      
      // entries: {date: {month: 4, day: 14, year: 1979}, 220: {shot: 3, bg: 28, bgLabel: 'wal', time: 220, notes: 'small breakfast'}, 300: {bg: 328, bgLabel: '', time: 300, notes: 'bite PB'}, 580: {shot: 6, bg: 108, bgLabel: 'wal', time: 580, notes: 'big lunch'}, 760: {shot: 5, bg: 250, bgLabel: '', time: 760, notes: 'high BS'}, 1140: {shot: -15, time: 1140}, 1160: {shot: 2, bg: 140, bgLabel: 'wal', time: 1160, notes: null}},
      entries: {},
      
      displayDate: '',
      displayTime: '',
      userInput: '',
      currentDate: 0,
      currentTime: 0,
      onToday: true,
      scroll: true
    };
    
    // this.handleChange = this.handleChange.bind(this);    
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  // **** textArea version
  
  handleChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const char = val.charCodeAt(val.length - 1)
    this.setState({userInput: val})
    console.log('current input ', val, val.length);
    console.log('endChar', char);
    if (char === 10) {
      this.setState({userInput: ''});
      // for (let j = 0; j < val.length; j++){
      //   console.log(val.charCodeAt(j), val[j]);
      // }
      this.processInput(val);
    }
  }
  
  scrollScreen() {
    const bottom = document.getElementById('bottom');
    bottom.scrollIntoView({ behavior: 'smooth' });
  }
  
  componentDidMount() {
    // set current date/time
    const d = new Date()
    const date = d.toLocaleDateString().replace(/\//g, '-');
    const time = d.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    
    this.setState({displayDate: date, displayTime: time, currentDate: date, onToday: true, scroll: true})
    
    // convert date to log date
    
    this.getEntries(date);
    
    // update clock
    
    setInterval(() => {
      const d = new Date()
      // const date = d.toLocaleDateString().replace(/\//g, '-');
      const time = d.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
      console.log('new time:', time)
      this.setState({displayTime: time})
    }, 30000)//3600000)
  }
  
  getEntries(date) {
    const convertedDate = 'log' + date;
    let entries;
    fetch(`/entries?date=${convertedDate}`)
    .then(res => res.json())
    .then((data) => {
      console.log('entries', data)
      if (typeof data !== 'object') {
        entries = {};
      } else {
        ({entries} = data);
      }
      this.setState({
        entries,
        fetchedEntries: true
      });
    })
    .then(() => {
      if (this.state.scroll) this.scrollScreen();
    })
    .catch(err => console.error('App.componentDidMount: get entries: ERROR: ', err));
  }
  
  insertEntries(entry, date) {
    const data = [entry, 'log' + date];
    
    fetch('entries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(success => {
      console.log('Success:', success);
    })
    .then(() => {
      this.getEntries(date)
      this.setState({displayDate: date})
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  }
  
  processInput(val) {
    console.log('PROCESS THIS val:', val);
    val = val.slice(0, val.length - 1);
    // const entry = {"600": {"shot": 2, "bg": 67, "bgLabel": "pre", "time": 600, "notes": "OMG I CANT BELIEVE IT'S NOT"}};
    // const date = '3-4-2021';
    
    // parse input
    const valArr = val.split(' ');
    if (valArr[0] === 'back') {
      this.setState({displayDate: 'log3-3-2021', displayTime: time, currentDate: '3-3-2021', onToday: false, scroll: true})
      this.getEntries('3-3-2021');
      return;
      
    } else if (val[0] === 'forward') {
      
    } else if (val[0] === 'now') {
      const d = new Date()
      const date = d.toLocaleDateString().replace(/\//g, '-');
      const time = d.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
      
      this.setState({displayDate: date, displayTime: time, currentDate: date, onToday: true, scroll: true})
      this.getEntries('3-4-2021');
      return;
    }
    
    let i = 0;
    let time;
    // let date;
    let bg;
    let shot;
    let bgLabel = '';
    let notes = '';
    console.log(valArr)
    while (i < valArr.length) {
      let el = valArr[i];
      if (typeof parseInt(el) === 'number') {
        el = parseInt(el);
        if (el < 20) {
          shot = el;
        } else if (el < 300) {
          bg = el;
        } else if (el < 1441) {
          time = el;
        }
      } else if (el === 'wal') {
        bgLabel = el;
      } else {
        notes = valArr.slice(i).join(' ');
        break;
      }
      i++;
    }    
    
    const d = new Date()
    const date = d.toLocaleDateString().replace(/\//g, '-');
    // const timeNow = d.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
    if (!time) {
      const h = d.getHours();
      const t = d.getMinutes();
      console.log('t:',  h, t)
      const mins = ((h - 4) * 60) + t;
      console.log('mins:', mins)
      const minsRound = Math.round(mins/10) * 10;
      console.log('minsRound:', minsRound)
      time = minsRound;
    }
    const entry = {};
    entry[time] = {shot, bg, bgLabel, time, notes};
    
    console.log('entry:', entry)
    
    
    // add to database
    this.setState({scroll: false});
    this.insertEntries(entry, date);
  }
  
  
  
  render() {
    
    return (
      <div>
      <Input value={this.state.userInput}
      handleChange={this.handleChange}
      />      <Day entries={this.state.entries}
      fetchedEntries={this.state.fetchedEntries}
      displayDate={this.state.displayDate}
      displayTime={this.state.displayTime}
      onToday={this.state.onToday}
      />
      {/* <Input value={this.state.userInput}
      handleChange={this.handleChange}
    /> */}
    </div>
    );
  }
}
export default App;



// ***** input type text versions

//   handleChange = (e) => {
//     e.preventDefault();
//     const v = e.target.value;
//     this.setState({userInput: e.target.value})
//     console.log('change ', v, v.length);
//     console.log('return', v.charCodeAt(v.length - 1))
//   }


//   handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log('submit', e.target.value);
//     const i = this.state.userInput;
//     console.log('input is: ', i);
//     this.setState({userInput: ''});
// for (let j = 0; j < i.length; j++){
// console.log(i.charCodeAt(j), i[j]);
// }
//   }



