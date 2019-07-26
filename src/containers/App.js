import React, { Component } from 'react';
import styles from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChanageHandler} />;
    }
    //                  click={this.deletePersonHandler(index)}

    return (
        <div className={styles.App}>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
          {persons}
        </div>
    );
//    return React.createElement(
//        'div',
//        {className:'App'},
//        React.createElement('h1', null, 'Does this work now?'),
//        'Hi, I\'m a React App!!!');
  }
}

export default App;
