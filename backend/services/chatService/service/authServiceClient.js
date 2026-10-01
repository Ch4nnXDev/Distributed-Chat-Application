const axios = require(axios);


const userExists = async (userId) => {
    try {
        const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/internal/users/${userId}`);
        if (response.status !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
}

module.exports = {
    userExists
}