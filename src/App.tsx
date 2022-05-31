import React, { ReactNode, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

enum InputTypes {userID = "userID", firstName = "firstName", lastName = "lastName", email = "email"}

interface ITest {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
}
class Test implements ITest {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(test?: ITest) {
        this.userID = test?.userID ?? -1;
        this.firstName = test?.firstName ?? "";
        this.lastName = test?.lastName ?? "";
        this.email = test?.email ?? "";
    }
}

class App extends React.Component {
    state = {
        returnedData: new Test()
    }

    render() {
        let newUser = new Test()

        const setInput = (e: any) => {
            const {name, value} = e.target
            switch(name) {
                case InputTypes.userID:
                    newUser.userID = value
                    break;
                case InputTypes.firstName:
                    newUser.firstName = value
                    break;
                case InputTypes.lastName:
                    newUser.lastName = value
                    break;
                case InputTypes.email:
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
                email: newData[0].Email}
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
                email: newData[0].Email}
                })
        }

        return (
            <div className="App">
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
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                </Routes>
            </div>
        );
    }
}

function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
                <p>You can do this, I believe in you.</p>
            </main>
            <nav>
                <Link to="/about">About</Link>
            </nav>
        </>
    );
}

function About() {
    return (
        <>
            <main>
                <h2>Who are we?</h2>
                <p>
                    That feels like an existential question, don't you
                    think?
                </p>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default App;
