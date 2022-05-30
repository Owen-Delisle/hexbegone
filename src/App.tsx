import React, {useState} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {

  const [returnedData, setReturnedData] = useState('hello');

  const fetchData = async() => {
    const newData = await fetch('/quit', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());
    console.log(newData);
    setReturnedData(newData.result)
  }

  return (
    <div className="App">
      <h1>HexBeGone</h1>
      <button onClick={() => fetchData()}>Click Me</button>
      <br />
      {returnedData}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
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
