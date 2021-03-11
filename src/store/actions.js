import {FETCH_DATA, HIDE_LOADER, SHOW_LOADER} from "./types";
import {API} from "../api"
import {postData} from "../utils/sendData"

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    }
}

export const hideLoader = () => {
    return {
        type: HIDE_LOADER
    }
}

const name = 'ivan';
const password = 'asdfdskj'

const register = () => {
    postData({name, password}, API.register.path, API.register.method).then((res) => {
        login();
    }).catch((err) => {
        const {status} = err.response;
        switch (status) {
            case 400:
                console.log("Пользователя уже существует")
                login();
                break;
            case 500:
                console.log("Ошибка сервера");
                break;
            default:
                console.log("Error");
                break;
        }
    })
}

const login = () => {
    postData({user: name, password}, API.login.path, API.login.method).then(() => {
        fetchData();
    }).catch((err) => {
        const {status} = err.response;
        switch (status) {
            case 400:
                console.log("Пользователя не существует");
                register();
                break;
            case 500:
                console.log("Ошибка сервера");
                break;
            default:
                console.log("Error");
                break;
        }
    })
}

export const logout = () => {
    console.log('asdasdas')
    postData(null, API.logout.path, API.logout.method).then(() => {
        console.log('success')
    })
}

export const fetchData = () => {
    return dispatch => {
        dispatch(showLoader())
        postData(null, API.getData.path, API.getData.method).then((res) => {
            dispatch({type: FETCH_DATA, payload: res.data})
            dispatch(hideLoader())
        }).catch((err) => {
            const {status} = err.response;
            switch (status) {
                case 401:
                    console.log("Пользователь не авторизован");
                    login();
                    break;
                case 500:
                    console.log("Ошибка сервера");
                    break;
                default:
                    console.log("Error");
                    break;
            }
        })
    }
}