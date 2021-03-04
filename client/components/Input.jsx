/* eslint-disable indent */
import React from 'react';

const Input = (props) => {
  
  
  return (
    
    // <div className="inputArea">
    // </div>
    
    <form className="inputArea" onSubmit={e => props.handleSubmit(e)}>
    <label>
    {/* Input: */}
    {/* <input autoComplete="off" autoFocus className="textArea" type="text" value={props.value} onChange={e => props.handleChange(e)} /> */}
    
    <textarea autoComplete="off" autoFocus className="textArea" value={props.value} onChange={e => props.handleChange(e)} />
    
    </label>
    {/* <input type="submit" value="Submit" /> */}
    {/* value={props.value} */}
    </form>
    
    
    );  
  };
  
  export default Input;
  
  
