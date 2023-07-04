import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ name, number }) => {
    return (
        <p>
            {name} {number}
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

        for (const person of persons) {
            if (person.name === newName) {
                alert(`${newName} is already added to phonebook`);
                return;
            }
        }
        const personObject = {
            name: newName,
            number: newNumber,
        };

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

const Persons = ({ persons, filter }) => (
    <ul>
        {persons
            .filter(
                (person) =>
                    filter === "" ||
                    person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
                <Person name={person.name} number={person.number}></Person>
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
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;
