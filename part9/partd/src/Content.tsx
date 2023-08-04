interface ContentProps {
    courseParts: {
        name: string
        exerciseCount: number
    } []
}

const Content = ({ courseParts }: ContentProps) => {
    return (
      <>
        {courseParts.map((coursePart) => (
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        ))}
      </>
    );
  };

export default Content;