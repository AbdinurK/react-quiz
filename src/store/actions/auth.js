import axios from "axios";
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./types"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYFxLoj2Mbl7Ks4fXunCb8M3s_dLyyuek';
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYFxLoj2Mbl7Ks4fXunCb8M3s_dLyyuek'
        }
        const response = await axios.post(url, authData)
        const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expireDate)

        dispatch(authSuccess(response.data.idToken))
        dispatch(autoLogout(response.data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT,
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expireDate = new Date(localStorage.getItem('expirationDate'))
            if (expireDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expireDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
