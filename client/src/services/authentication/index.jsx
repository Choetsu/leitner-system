import axios from "axios";

export const register = async (lastname, firstname, email, password) => {
    const response = await axios.post("http://localhost:8080/users/register", {
        lastname,
        firstname,
        email,
        password,
    });
    return response;
};

export const login = async (email, password) => {
    const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
    });
    return response;
};
