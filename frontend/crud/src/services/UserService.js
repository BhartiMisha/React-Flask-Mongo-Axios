import axios from 'axios';

const USER_API_URL = "http://localhost:5000/users";

class UserService{
    // get all methods related to user crud

    getUsers() {
        return axios.get(USER_API_URL);
    }

    createUser(user) {
        return axios.post(USER_API_URL, user);
    }

    getUserById(userId) {
        return axios.get(USER_API_URL + '/' + userId);
    }

    updateUser(userId, user) {
        return axios.put(USER_API_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_URL + '/' + userId);
    }
}

export default new UserService();