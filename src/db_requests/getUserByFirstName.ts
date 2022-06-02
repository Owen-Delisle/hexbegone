export const getUserByFirstName = async (firstName: string) => {
    const newData = await fetch('/api', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: firstName
        })
    }).then(res => res.json());
    return newData
}