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
      onToday: true
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

    this.setState({displayDate: date, displayTime: time, currentDate: date, onToday: true})
    
    // convert date to log date
    
    this.getEntries(date);
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
        console.log(res);
      } else {
        ({entries} = data);
      }
      this.setState({
        entries,
        fetchedEntries: true
      });
    })
    .then(this.scrollScreen)
    .catch(err => console.error('App.componentDidMount: get entries: ERROR: ', err));
  }
  
  insertEntries(entry, date) {


    const data = [entry, date];
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
      this.setState({displayDate: date})
      this.getEntries(date)
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  }
  
  processInput(val) {
    console.log('PROCESS THIS val:', val);
    const entry = {"600": {"shot": 2, "bg": 67, "bgLabel": "pre", "time": 600, "notes": "OMG I CANT BELIEVE IT'S NOT"}};
    const date = '3-4-2021';
    this.insertEntries(entry, date);
    this.getEntries(date);
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



