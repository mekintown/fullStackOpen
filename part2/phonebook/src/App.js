import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ name, number, id, setPersons }) => {
    const handleClick = (event) => {
        if (window.confirm(`Delete ${event.target}?`)) {
            personService.remove(id);
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

const PersonForm = ({ persons, setPersons }) => {
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
                                persons.map((oldPerson) =>
                                    oldPerson.id !== person.id
                                        ? oldPerson
                                        : returnedPerson
                                )
                            );
                        });
                    return;
                }
            }
        }

        personService.create(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNumber("");
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

const Persons = ({ persons, filter, setPersons }) => (
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
                ></Person>
            ))}
    </ul>
);

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState("");

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
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter}
                setPersons={setPersons}
            />
        </div>
    );
};

export default App;
