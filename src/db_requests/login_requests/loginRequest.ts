export const loginRequest = async (email: string, password: string) => {
    const data = await fetch('/login', {
        method: 'POST',
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json());
    return data
}