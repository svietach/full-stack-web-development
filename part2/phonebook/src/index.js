import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
}

const Persons = ({ persons, newPhoneSearch }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.indexOf(newPhoneSearch) > -1) {
          return <p>{person.name} {person.phone}</p>;
        } else {
          return null;
        }
      })}
    </div>
  );
}

const PersonForm = ({ newName, newPhone, handleChangeName, handleChangePhone, handleAdd }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleChangeName} /><br />
        number: <input value={newPhone} onChange={handleChangePhone} />
      </div>
      <div>
        <button type="button" onClick={handleAdd}>add</button>
      </div>
    </form>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newPhoneSearch, setNewPhoneSearch] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleAdd = () => {
    const findPerson = persons.filter((person) => person.name === newName);
    console.log(findPerson);
    if (!!findPerson.length) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        {
          name: newName,
          phone: newPhone,
        }])
    }
  }

  const handleChangePhoneSearch = (event) => {
    setNewPhoneSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newPhoneSearch} onChange={handleChangePhoneSearch} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} newPhoneSearch={newPhoneSearch} />
    </div>
  )
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#root'));
});
