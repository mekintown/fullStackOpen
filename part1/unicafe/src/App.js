import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ name, handleClick }) => (
    <button onClick={handleClick}>{name}</button>
);

const Statistics = ({ name, value, unit }) => (
    <p>
        {name} {value} {unit}
    </p>
);

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <Header title="give feedback" />
                <Button name="good" handleClick={() => setGood(good + 1)} />
                <Button
                    name="neutral"
                    handleClick={() => setNeutral(neutral + 1)}
                />
                <Button name="bad" handleClick={() => setBad(bad + 1)} />
                <Header title="statistics" />
                <p>No feedback given</p>
            </div>
        );
    }
    return (
        <div>
            <Header title="give feedback" />
            <Button name="good" handleClick={() => setGood(good + 1)} />
            <Button
                name="neutral"
                handleClick={() => setNeutral(neutral + 1)}
            />
            <Button name="bad" handleClick={() => setBad(bad + 1)} />
            <Header title="statistics" />
            <Statistics name="good" value={good} />
            <Statistics name="neutral" value={neutral} />
            <Statistics name="bad" value={bad} />
            <Statistics name="all" value={good + neutral + bad} />
            <Statistics
                name="average"
                value={(good * 1 + bad * -1) / (good + neutral + bad)}
            />
            <Statistics
                name="positive"
                value={(good / (good + neutral + bad)) * 100}
                unit="%"
            />
        </div>
    );
};

export default App;
