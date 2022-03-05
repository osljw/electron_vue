import http from "@/utils/http";


export const Login = p => http.post('login', p);

export function Register(data) {
    return http.post('register', data)
}

export function GetMenu() {
    return http.get('menus')
}