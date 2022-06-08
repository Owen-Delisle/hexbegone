import React from 'react';
import { UserInputs } from "../types/user"
import { getUserByEmail } from "../db_requests/login_requests/getUserByEmail"

export default class SignUp extends React.Component {
    state = {
    }
    render() {
        let emailInput: string
        let passwordInput: string

        const setInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = e.target
            switch (name) {
                case UserInputs.email:
                    emailInput = value
                    break;
                case UserInputs.password:
                    passwordInput = value;
                    break;
            }
        }

        const loginUser = (emailInput: string, passwordInput: string): void => {
            getUserByEmail(emailInput, passwordInput).then((data?) => {
                const d = data
                switch(data) {
                    case null:
                        console.log("Login failure")
                        break
                    default:
                        console.log(data.accessToken)
                }
            }).catch((err) => {
                console.log("err from login page", err)
            })
        }

        const storeUserSessionToken = () => {

        }

        return (
            <>
                <h1>Login</h1>
                <input name="email" placeholder="email" onChange={setInput}></input>
                <input name="password" placeholder="password" onChange={setInput}></input>
                <br />
                <button onClick={
                    () => loginUser(emailInput, passwordInput)
                }>Register</button>
            </>
        );
    }
}