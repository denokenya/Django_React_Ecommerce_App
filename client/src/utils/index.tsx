const localUser = localStorage.getItem('user');
const user = JSON.parse(localUser as string);

export const isAuth = user.token ? true : false;
export const isAdmin = user.isAdmin ? true : false;

export const config = {
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`
    }
}