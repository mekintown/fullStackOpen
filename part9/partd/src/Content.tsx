import Part from "./Part"
import { CoursePart } from "./types"

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
    return (
      <>
        {courseParts.map((coursePart) => (
          <div key={coursePart.name}>
            <Part coursePart={coursePart}/>
          </div>
        ))}
      </>
    );
  };

export default Content;