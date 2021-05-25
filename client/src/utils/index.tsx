const token = localStorage.getItem('my_token');

export const config = {
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    }
}