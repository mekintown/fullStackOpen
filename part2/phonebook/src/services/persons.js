import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = () => {
    return axios.post(baseUrl).then((response) => response.data);
};
// const update = (id newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }
