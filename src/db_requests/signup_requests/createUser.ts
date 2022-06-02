import { User } from "../../types/user"

export const createUser = async (newUser: User) => {
    const newData = await fetch('/create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...newUser
        })
    }).then(res => res.json());
    console.log("New User Created", newData)
}