import axios from "axios";
const getMe = async () => {
    const data = await axios.get("http://localhost:8080/auth/me", { withCredentials: true });
    return data;

}

export default getMe;