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

export default Course;
