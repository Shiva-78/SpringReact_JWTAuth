import axios from 'axios'

const API_URL = 'http://localhost:8080'

class RegisterationService {

    executeUserRegistration(username, password) {
        return axios.post(`${API_URL}/register`, {
            username,
            password
        })
    }

}
export default new RegisterationService();