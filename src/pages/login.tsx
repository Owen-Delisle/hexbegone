import React from 'react';
import { UserInputs } from "../types/user"
import { loginRequest } from "../db_requests/login_requests/loginRequest"
import { getSessionData } from '../db_requests/login_requests/getSessionData';

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
            loginRequest(emailInput, passwordInput).then((data) => {
                console.log("DABADEBER", data)
            }).catch((err) => {
                console.log("err from login page", err)
            })
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
                <br />
                <button onClick={() => getSessionData()}></button>
            </>
        );
    }
}