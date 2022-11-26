import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3009/event")
      .then((res) => res.json())
      .then((data) => setEventList(data.events));
  }, []);

  console.log("here is the event list!!", eventList);

  return (
    <div className="App">
      <Navbar />
      <div className="landing-page-img">
        <h2>گفتگو</h2>
      </div>
    </div>
  );
}

export default App;
