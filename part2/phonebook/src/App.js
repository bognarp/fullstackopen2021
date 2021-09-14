import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, onChange }) => {
  return (
    <div>
      filter shown with: <input value={query} onChange={onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  const { onSubmit, nameValue, nameOnChange, phoneValue, phoneOnChange } = props

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={phoneOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    personsToShow.map(person =>
      <p key={person.id}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNo, setNewPhoneNo] = useState('')
  const [nameQuery, setNameQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = nameQuery.length === 0
    ? persons
    : persons.filter(person =>
      person.name.toUpperCase().includes(nameQuery.toUpperCase())
    )

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newPhoneNo
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhoneNo('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhoneNo(event.target.value)
  }

  const handleQueryChange = (event) => {
    setNameQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={nameQuery} onChange={handleQueryChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        phoneValue={newPhoneNo}
        phoneOnChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div >
  )
}

export default App
