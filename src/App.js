import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
    persons: [
      { id: 'a1', name: 'Max', age: 28},
      { id: 'a2', name: 'Manu', age: 29},
      { id: 'a3', name: 'Stephaine', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChanageHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons:persons});

/*      this.setState({
        persons: [
          { name: 'Max', age: 28},
          { name: event.target.value, age: 29},
          { name: 'Stephaine', age: 26}
        ]
      })*/
  };

  togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // ES5
    const persons = [...this.state.persons];  // ES6
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      borders: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
          <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                  click={() => this.deletePersonHandler(index)}
                  name={person.name}
                  age={person.age}
                  changed={(event) => this.nameChanageHandler(event, person.id)}/>
            </ErrorBoundary>
            })}
          </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    //                  click={this.deletePersonHandler(index)}

    // let classes = ['red','bold'].join(' ');  // "red bold"
    let classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red'); // classes = ['red'];
    }
    if (this.state.persons.length <= 1){
      classes.push('bold'); // classes = ['red','bold'];
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>
    );
//    return React.createElement(
//        'div',
//        {className:'App'},
//        React.createElement('h1', null, 'Does this work now?'),
//        'Hi, I\'m a React App!!!');
  }
}

export default Radium(App);
