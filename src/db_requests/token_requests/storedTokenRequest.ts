export const storedTokenRequest = async () => {
    const data = await fetch('/refresh_token_from_db', {
        method: 'POST',
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
    }).then(res => res.json());
        
    return data
}