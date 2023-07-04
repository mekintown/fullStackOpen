import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((response) => response.data);
};

const personService = { getAll, create };
export default personService;
// const update = (id newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }
