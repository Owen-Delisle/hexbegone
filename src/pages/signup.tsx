import React from 'react';
import { User, UserInputs } from "../types/user"
import { v4 as uuidv4 } from 'uuid';
import { getUserByFirstName } from '../db_requests/getUserByFirstName';
import { createUser } from '../db_requests/signup_requests/createUser';

export default class SignUp extends React.Component {
    state = {
    }
    render() {
        let newUser = new User()

        const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            newUser.userID = uuidv4()
            const { name, value } = e.target
            switch (name) {
                case UserInputs.firstName:
                    newUser.firstName = value
                    break;
                case UserInputs.lastName:
                    newUser.lastName = value
                    break;
                case UserInputs.email:
                    newUser.email = value
            }
        }

        return (
            <>
                <h1>SignUp</h1>
                <input name="firstName" placeholder="firstName" onChange={setInput}></input>
                <input name="lastName" placeholder="lastName" onChange={setInput}></input>
                <input name="email" placeholder="email" onChange={setInput}></input>
                <br />
                <button onClick={
                    () => createUser(newUser)
                }>Register</button>
            </>
        );
    }
}