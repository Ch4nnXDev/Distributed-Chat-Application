import createUser from "../service/presenceService";
import getAllUsers from "../service/presenceService";
import checkOnline from "../services/presenceService";

const createUserController = async (req, res) => {
    const {user} = req.user;
    return await createUser(user);
    
}

const getAllUsersController = async (req, res) => {
    const users = await getAllUsers();
    return users;
    

}

const isOnlineController = async (req, res) => {
    const {user} = req.user;
    return await checkOnline(user)

}