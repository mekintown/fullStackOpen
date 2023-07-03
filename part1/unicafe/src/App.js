import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ name, handleClick }) => (
    <button onClick={handleClick}>{name}</button>
);

const Content = ({ name, count }) => (
    <p>
        {name} {count}
    </p>
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
            <Content name="good" count={good} />
            <Content name="neutral" count={neutral} />
            <Content name="bad" count={bad} />
        </div>
    );
};

export default App;
