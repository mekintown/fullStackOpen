import { CoursePart } from "./types"

interface partProps {
    coursePart: CoursePart
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
}

const Part = ({coursePart} : partProps) => {
    switch(coursePart.kind) {
        case "basic":
            return (
                <div>
                   <h4>{coursePart.name} {coursePart.exerciseCount}</h4> 
                   <p>{coursePart.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h4>{coursePart.name} {coursePart.exerciseCount}</h4> 
                    <p>project exercise {coursePart.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                   <h4>{coursePart.name} {coursePart.exerciseCount}</h4> 
                   <p>{coursePart.description}</p>
                   <p>submit to {coursePart.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                <h4>{coursePart.name} {coursePart.exerciseCount}</h4> 
                <p>{coursePart.description}</p>
                <p>submit to {coursePart.requirements.map((requirement) => <span key={requirement}> {requirement}, </span>)}</p>
             </div>
            )
        default:
            return assertNever(coursePart)
    }
}

export default Part;