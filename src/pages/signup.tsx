import React from 'react';
import { User, UserInputs } from "../types/user"

export default class SignUp extends React.Component {
    state = {
        returnedData: new User()
    }
    render() {
        let newUser = new User()

        const setInput = (e: any) => {
            const { name, value } = e.target
            switch (name) {
                case UserInputs.userID:
                    newUser.userID = value
                    break;
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

        const fetchData = async () => {
            const newData = await fetch('/api', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: newUser.firstName
                })
            }).then(res => res.json());
            console.log("New DATA", newData)

            this.setState({
                returnedData: {
                    userID: newData[0].UserID,
                    firstName: newData[0].FirstName,
                    lastName: newData[0].LastName,
                    email: newData[0].Email
                }
            })
        }

        const createUser = async () => {
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
            console.log("New DATA", newData)

            this.setState({
                returnedData: {
                    userID: newData[0].UserID,
                    firstName: newData[0].FirstName,
                    lastName: newData[0].LastName,
                    email: newData[0].Email
                }
            })
        }
        return (
            <>
                <h1>HexBeGone</h1>
                <button onClick={() => createUser()
                }>Create</button>
                <button onClick={() => fetchData()}>Get by First Name</button>
                <br />
                <input type="number" name="userID" placeholder="userID" onChange={setInput}></input>
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