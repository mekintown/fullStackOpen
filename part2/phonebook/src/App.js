import { useState } from "react";

const Person = ({ name, number }) => {
    return (
        <p>
            {name} {number}
        </p>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNumber] = useState("");
    const [filter, setFilter] = useState("");

    const addPerson = (event) => {
        event.preventDefault();
        for (const person of persons) {
            if (person.name === newName) {
                alert(`${newName} is already added to phonebook`);
                return;
            }
        }
        const personObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber,
        };
        setPersons(persons.concat(personObject));
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with:{" "}
                <input value={filter} onChange={handleFilterChange} />
            </div>
            <h2>add a new</h2>
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
            <h2>Numbers</h2>
            <ul>
                {persons
                    .filter(
                        (person) =>
                            filter === "" ||
                            person.name
                                .toLowerCase()
                                .includes(filter.toLowerCase())
                    )
                    .map((person) => (
                        <Person
                            key={person.id}
                            name={person.name}
                            number={person.number}
                        ></Person>
                    ))}
            </ul>
        </div>
    );
};

export default App;
