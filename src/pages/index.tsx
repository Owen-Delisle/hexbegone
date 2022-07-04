import { Routes, Route } from "react-router-dom";
import Home from "./home"
import About from "./about"
import SignUp from "./signup"
import Login from "./login"

export default function Index() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </>
    );
}