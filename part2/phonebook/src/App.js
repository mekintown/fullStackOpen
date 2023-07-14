import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ name, number, id, setPersons, setErrorMessage }) => {
    const handleClick = (event) => {
        if (window.confirm(`Delete ${event.target}?`)) {
            personService.remove(id).catch((error) => {
                setErrorMessage([
                    true,
                    `Information of {newName} has already been removed from server`,
                ]);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
            personService.getAll().then((newPersons) => setPersons(newPersons));
        }
    };
    return (
        <p>
            {name} {number} <button onClick={handleClick}>delete</button>
        </p>
    );
};

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            filter shown with:{" "}
            <input value={filter} onChange={handleFilterChange} />
        </div>
    );
};

const PersonForm = ({ persons, setPersons, setErrorMessage }) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNumber] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        const personObject = {
            name: newName,
            number: newNumber,
        };

        for (const person of persons) {
            if (person.name === newName) {
                if (
                    window.confirm(
                        `${person.name} is already added to phonebook, replace the old number with a new one?`
                    )
                ) {
                    personService
                        .update(person.id, personObject)
                        .then((returnedPerson) => {
                            setPersons(
                                persons.map((oldPerson) => {
                                    return oldPerson.id !== person.id
                                        ? oldPerson
                                        : returnedPerson;
                                })
                            );
                            setErrorMessage([
                                false,
                                `Updated the number of {newName}`,
                            ]);
                            setTimeout(() => {
                                setErrorMessage(null);
                            }, 5000);
                        })
                        .catch((error) => {
                            setErrorMessage([
                                true,
                                `Information of {newName} has already been removed from server`,
                            ]);
                            setTimeout(() => {
                                setErrorMessage(null);
                            }, 5000);
                        });
                    return;
                }
            }
        }

        personService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNumber("");
                setErrorMessage([false, `Added {newName}`]);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            })
            .catch((error) => {
                setErrorMessage([true, error.response.data.error]);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number:{" "}
                <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>
                    add
                </button>
            </div>
        </form>
    );
};

const Persons = ({ persons, filter, setPersons, setErrorMessage }) => (
    <ul>
        {persons
            .filter(
                (person) =>
                    filter === "" ||
                    person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
                <Person
                    name={person.name}
                    number={person.number}
                    key={person.id}
                    id={person.id}
                    setPersons={setPersons}
                    setErrorMessage={setErrorMessage}
                ></Person>
            ))}
    </ul>
);

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    let style = {};
    if (message[0]) {
        style = {
            color: "red",
            filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            fontSize: "1rem",
        };
    } else {
        style = {
            color: "green",
            filter: "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
            fontSize: "1rem",
        };
    }
    return (
        <div style={style}>
            <p>{message}</p>
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        personService
            .getAll()
            .then((initialPerson) => setPersons(initialPerson));
    }, []);
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                setErrorMessage={setErrorMessage}
            />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter}
                setPersons={setPersons}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
};

export default App;
