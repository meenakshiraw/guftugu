import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
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
      .then((res) => {
        setCurrentUsername(res.name);
        setCurrentUserId(res.user);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3009/user/${currentUserId}`)
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
        const myEvents = data.foundUser.myEvents;
        for (const event of myEvents) {
          fetch(`http://localhost:3009/event/${event}`)
            .then((res) => res.json())
            .then((data) =>
              setEventList((prevState) => [...prevState, data.foundEvent])
            );
        }
      });
  }, [currentUserId]);

  console.log("here is the event list!!", eventList);
  console.log("here is the group list!!", groupList);
  console.log("here is the current user", currentUserId);

  return (
    <div className="App">
      {currentUsername && <h2>Welcome {currentUsername}</h2>}
      <h2>My Groups</h2>
      <div className="group-grid">
        {groupList.map((group) => (
          <Card
            key={group._id}
            title={group.name}
            link={`/group/${group._id}`}
            imgUrl={group.img}
            desc={"just some description"}
          />
        ))}
      </div>
      <h2>My Upcoming Events</h2>
      <div className="group-grid">
        {eventList.map((event) => (
          <Card
            key={event.id}
            title={event.name}
            imgUrl={
              "https://www.nordantech.com/media/pages/blog/community/8-tipps-fuer-ein-erfolgreiches-meeting/00022d9063-1643812301/meeting-tipps-erfolgreich-1200x630.jpg"
            }
            link={`http://${event.meetingURL}`}
            desc={event.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
