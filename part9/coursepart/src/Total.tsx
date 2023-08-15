interface TotalProps {
  courseParts: {
    exerciseCount: number;
  }[];
}

const Total = ({ courseParts }: TotalProps) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;
