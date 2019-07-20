import React from 'react';
import './Person.css';
import Radium from 'radium';


const person = (props) => {
  /*const random = Math.random();
  if (random > 0.7){
    throw new Error('Something went wrong');
  }*/

  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  };

  return (

        <div className="Person" style={style}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
  )
}

export default Radium(person);