import $api from "./http/interceptors";
import {sha256} from "./encoder";

export default class AuthService {
    static async login(username, password) {
        password = sha256(password)
        return $api.post("/auth/login",
            {
                username,
                password
            })
    }

    static async registration(name, username, password) {
        password = sha256(password)
        return $api.post("/auth/registration",
            {
                name,
                username,
                password
            })
    }

    static async test() {
        return $api.get("/hits/test")
    }

    static logout(setIsAuth) {
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    static async authRestore() {
        if (localStorage.getItem("token")) {
            return this.test().then(reason => {return true}).catch(r => {return false})
        }
        return false
    };

}