import { useState } from "react";

const Person = ({ name, id }) => {
    return <p>{name}</p>;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");

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
        };
        setPersons(persons.concat(personObject));
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <Person key={person.id} name={person.name}></Person>
                ))}
            </ul>
        </div>
    );
};

export default App;
