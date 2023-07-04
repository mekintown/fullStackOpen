const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
);

const Content = ({ parts }) =>
    parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id}></Part>
    ));

const Course = ({ course }) => {
    const allcourse = course.parts.reduce(
        (total, curr) => total + curr.exercises,
        0
    );
    return (
        <div>
            <Header course={course.name}></Header>
            <Content parts={course.parts}></Content>
            <p>total of {allcourse} exercises</p>
        </div>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
        ],
    };

    return <Course course={course} />;
};

export default App;
