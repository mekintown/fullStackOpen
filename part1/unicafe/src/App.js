import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ name, handleClick }) => (
    <button onClick={handleClick}>{name}</button>
);

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;

    if (total === 0) {
        return <p>No feedback given</p>;
    }

    return (
        <table>
            <StatisticsLine name="good" value={good} />
            <StatisticsLine name="neutral" value={neutral} />
            <StatisticsLine name="bad" value={bad} />
            <StatisticsLine name="all" value={total} />
            <StatisticsLine
                name="average"
                value={(good * 1 + bad * -1) / total}
            />
            <StatisticsLine
                name="positive"
                value={(good / total) * 100}
                unit="%"
            />
        </table>
    );
};

const StatisticsLine = ({ name, value, unit }) => (
    <tr>
        <td>{name}</td>
        <td>
            {value} {unit}
        </td>
    </tr>
);

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
