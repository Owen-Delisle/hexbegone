export const getUserByEmail = async (email: string, password: string) => {
    const data = await fetch('/login', {
        method: 'POST',
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