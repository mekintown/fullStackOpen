import { Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

type Props = {
    entry : Entry
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const EntryDetails = ({entry} : Props) => {
    switch(entry.type) {
        case "HealthCheck":
            return (
                <div>
                    {entry.date} <FavoriteIcon />
                    <p>{entry.description}</p>
                    <div>
                        {entry.healthCheckRating}
                    </div>
                </div>
            )
        case "Hospital":
            return (
                <div>
                    {entry.date} <LocalHospitalIcon />
                    <p>{entry.description}</p>
                    <p>discharge : {entry.discharge.date} | {entry.discharge.criteria}</p>
                </div>
            )
        case "OccupationalHealthcare":
            return (
                <div>
                    {entry.date} <HomeRepairServiceIcon /> {entry.employerName}
                    <p>{entry.description}</p>
                </div>
            )
        default:
            return assertNever(entry);
    }
}


export default EntryDetails;