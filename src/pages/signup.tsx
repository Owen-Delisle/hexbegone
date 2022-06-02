import React from 'react';
import { User, UserInputs } from "../types/user"
import { v4 as uuidv4 } from 'uuid';
import { getUserByFirstName } from '../db_requests/getUserByFirstName';
import { createUser } from '../db_requests/signup_requests/createUser';

export default class SignUp extends React.Component {
    state = {
        returnedData: new User()
    }
    render() {
        let newUser = new User()

        const setInput = (e: any) => {
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
                <h1>HexBeGone</h1>
                <button onClick={
                    () => createUser(newUser)
                }>Create</button>
                <button onClick={
                    () => getUserByFirstName(newUser.firstName)
                }>Get by First Name</button>
                <br />
                <input name="firstName" placeholder="firstName" onChange={setInput}></input>
                <input name="lastName" placeholder="lastName" onChange={setInput}></input>
                <input name="email" placeholder="email" onChange={setInput}></input>
                <p>UserID: {this.state.returnedData.userID}</p>
                <p>First Name: {this.state.returnedData.firstName}</p>
                <p>Last Name: {this.state.returnedData.lastName}</p>
                <p>Email: {this.state.returnedData.email}</p>
            </>
        );
    }
}