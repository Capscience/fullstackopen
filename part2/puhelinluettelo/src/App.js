import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'


const Filter = ({filter, handler}) => {
    return (
        <div>
            filter: <input value={filter} onChange={handler}/>
        </div>
    )
}

const NewPersonForm = ({
    addPerson, newName, nameHandler, newNumber, numberHandler
}) => {
    return (
        <>
            <h2>Add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={nameHandler}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={numberHandler}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const Persons = ({persons, pattern, removePerson}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <thead>
                    <tr>
                        <td><b>Name</b></td>
                        <td><b>Number</b></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {persons.filter((person) => {
                        if (pattern !== '') {
                            return person.name.toLowerCase().includes(pattern.toLowerCase())
                        } else {return true}
                    }).map((person) =>
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button
                                    onClick={()=>removePerson(person)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

const Notification = ({message, isError}) => {
    if (message === null) {
        return null
    }

    if (isError) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="info">
                {message}
            </div>
        )
    }
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [pattern, setNewPattern] = useState('')
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handlePatternChange = (event) => {
        setNewPattern(event.target.value)
    }
    const updatePerson = (index) => {
        if (window.confirm(`${newName} is already in the phonebook, do you want to replace the old number with the new one?`)) {
            personsService
                .update(persons[index].id, {name: newName, number: newNumber})
                .then(response => {
                    personsService
                        .getAll()
                        .then(response => {
                            setPersons(response.data);
                            setIsError(false);
                            setMessage(
                                `Number of '${persons[index].name}' has been updated`
                            );
                            setNewName('');
                            setNewNumber('')
                            setTimeout(() => {
                                setMessage(null)
                            }, 3500)
                        })
                })
                .catch(error => {
                    setIsError(true)
                    setMessage(
                        `Person '${persons[index].name}' was already removed from server`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 3500)
                })
        }
    }
    const addPerson = (event) => {
        event.preventDefault();
        const index = persons.map((person) => person.name).indexOf(newName)
        index === -1
            ? personsService.create({name: newName, number: newNumber})
            .then(response => {
                setPersons(persons.concat(response.data));
                setIsError(false);
                setMessage(`Added ${newName}`);
                setNewName('');
                setNewNumber('');
                setTimeout(() => {
                    setMessage(null)
                }, 3500)
            })
        : updatePerson(index)
    }
    const removePerson = person => {
        if (window.confirm(`Do you really want to delete ${person.name}?`)) {
            personsService
                .remove(person.id)
                .then(response => {
                    personsService
                        .getAll()
                        .then(response => {
                            setPersons(response.data);
                            setIsError(false);
                            setMessage(`Removed ${person.name}`);
                            setTimeout(() => {
                                setMessage(null)
                            }, 3500)
                        })
                })
        }
    }
    const hook = () => {
        personsService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
            .catch(error => {
                setIsError(true);
                setMessage("Could not connect to database");
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError} />
            <Filter pattern={pattern} handler={handlePatternChange} />
            <NewPersonForm
                addPerson={addPerson}
                newName={newName}
                nameHandler={handleNameChange}
                newNumber={newNumber}
                numberHandler={handleNumberChange}
            />
            <Persons
                persons={persons}
                pattern={pattern}
                removePerson={removePerson}
            />
        </div>
    )
}

export default App
