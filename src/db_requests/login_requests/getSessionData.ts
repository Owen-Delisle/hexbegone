export const getSessionData = async () => {
    const data = await fetch('/session', {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());
    return data
}