import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Person = ({ name, number, deletePerson }) => {
  return (
    <p>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNo, setNewPhoneNo] = useState('')
  const [nameQuery, setNameQuery] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(personsList => {
        setPersons(personsList)
      })
  }, [])

  const personsToShow = nameQuery.length === 0
    ? persons
    : persons.filter(person =>
      person.name.toUpperCase().includes(nameQuery.toUpperCase())
    )

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newPhoneNo }
        const id = existingPerson.id

        personsService.update(id, updatedPerson)
          .then(response => {
            setPersons(persons.filter(person => person.id !== id).concat(updatedPerson))
            setNewName('')
            setNewPhoneNo('')
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newPhoneNo
    }

    personsService.create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewPhoneNo('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService.remove(id)
        .then(noContent => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`${person.name} was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
      <div>
        {personsToShow.map(person =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </div>
    </div >
  )
}

export default App
