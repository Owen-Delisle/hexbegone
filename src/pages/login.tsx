import React from 'react';
import { User, UserInputs } from "../types/user"
import { v4 as uuidv4 } from 'uuid';
import { getUserByEmail } from "../db_requests/login_requests/getUserByEmail"

export default class SignUp extends React.Component {
    state = {
    }
    render() {
        let email: string
        let password: string

        const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            switch (name) {
                case UserInputs.email:
                    email = value
                    break;
                case UserInputs.password:
                    password = value;
                    break;
            }
        }

        return (
            <>
                <h1>Login</h1>
                <input name="email" placeholder="email" onChange={setInput}></input>
                <input name="password" placeholder="password" onChange={setInput}></input>
                <br />
                <button onClick={
                    () => getUserByEmail(email, password)
                }>Register</button>
            </>
        );
    }
}