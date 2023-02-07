export class Validator {
    static showErrorMessage(msg, errPlace) {
        errPlace.html(msg)
        setTimeout(() => {
            errPlace.html("")
        }, 1000)
    }

    static checkPasswordLength(password) {
        try {
            return password.length > 0 && password.length < 24
        } catch (e) {
            return false
        }
    }

    static checkUsernameLength(username) {
        try {
            return username.length > 0 && username.length < 32
        } catch (e) {
            return false
        }

    }
}

