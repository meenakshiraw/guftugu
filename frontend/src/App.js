import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [eventList, setEventList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3009/signin", {
      method: "POST",
      body: JSON.stringify({
        email: "usmanaqadri2@gmail.com",
        password: "passy",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => setCurrentUser(res.user));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3009/user/${currentUser}`)
      .then((res) => res.json())
      .then((data) => {
        const myGroups = data.foundUser.myGroups;
        for (const group of myGroups) {
          fetch(`http://localhost:3009/group/${group}`)
            .then((res) => res.json())
            .then((data) =>
              setGroupList((prevState) => [...prevState, data.foundGroup])
            );
        }
      });
  }, [currentUser]);

  useEffect(() => {
    fetch("http://localhost:3009/event")
      .then((res) => res.json())
      .then((data) => setEventList(data.events));
  }, []);

  console.log("here is the event list!!", eventList);
  console.log("here is the group list!!", groupList);

  return (
    <div className="App">
      <Navbar />
      <div className="landing-page-img"></div>
    </div>
  );
}

export default App;
