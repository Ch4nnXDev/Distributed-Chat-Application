import axios from "axios";
const getMe = async () => {
    const data = await axios.get("http://localhost:8080/auth/me", { withCredentials: true });
    return data;

}




const getUsers = async () => {
    const users = await axios.get("http://localhost:8080/auth/user");
    return users

}

export default getMe; getUsers;