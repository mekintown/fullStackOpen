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
            <p>
                <strong>total of {allcourse} exercises</strong>
            </p>
        </div>
    );
};

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
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
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];
    return courses.map((course) => (
        <Course course={course} key={course.id}></Course>
    ));
};

export default App;
