import { Link } from "react-router-dom";
import { storedTokenRequest } from "../db_requests/token_requests/storedTokenRequest"

export default function Home() {
    return (
        <>
            <main>
                <h2>Welcome to the homepage!</h2>
                <p>You can do this, I believe in you.</p>
                <button onClick={() => storedTokenRequest().then((data) => {
                    console.log("DABADEBER", data)
                }).catch((err) => {
                    console.log("err from login page", err)
                })}>Token Stuff</button>
            </main>
            <nav>
                <Link to="/about">About</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
            </nav>
        </>
    );
}