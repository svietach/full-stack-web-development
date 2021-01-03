import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { create, getAll, deletePerson, updatePerson } from './personService.js';
import './index.css';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
}

const Persons = ({ persons, newPhoneSearch, deletePersonHandler }) => {

  return (
    <div>
      {persons.map((person) => {
        if (person.name.indexOf(newPhoneSearch) > -1) {
          return <p>{person.name} {person.phone} <button type="button" onClick={() => deletePersonHandler(person)}>delete</button></p>;
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

const Notification = ({ message }) => {
  return (
    <p className={`error-message-${message.color}`}>{message.message}</p>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newPhoneSearch, setNewPhoneSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(async () => {
    const data = await getAll();
    console.log(data.data);
    setPersons(data.data);
  }, []);

  const deletePersonHandler = async (person) => {
    const deleted = await deletePerson(person.id);
    if (!deleted) {
      setErrorMessage({ message: 'Information of ' + person.name + 'has already been removed from server', color: 'red' });
    }
    const data = await getAll();
    setPersons(data.data);
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = async (data) => {
    await create(data);
  }

  const handleAdd = async () => {
    const findPerson = persons.filter((person) => person.name === newName);
    let isConfirmed = false;
    if (!!findPerson.length) {
      console.log(persons, findPerson);
      // eslint-disable-next-line no-restricted-globals
      isConfirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one ^_^`);
    }

    if (isConfirmed) {
      await updatePerson({
        id: findPerson[0].id,
        name: newName,
        phone: newPhone,
      });
      setErrorMessage({ message: 'Updated ' + newName, color: 'green' });
    }

    if (!findPerson.length) {
      await create({
        name: newName,
        phone: newPhone,
      });
      setErrorMessage({ message: 'Added ' + newName, color: 'green' });
    }

    const data = await getAll();
    setPersons(data.data);
  }

  const handleChangePhoneSearch = (event) => {
    setNewPhoneSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {!!errorMessage && <Notification message={errorMessage} />}
      <Filter value={newPhoneSearch} onChange={handleChangePhoneSearch} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} newPhoneSearch={newPhoneSearch} deletePersonHandler={deletePersonHandler} />
    </div>
  )
}

export default App;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#root'));
});
