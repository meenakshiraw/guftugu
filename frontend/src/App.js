import React, { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import "./App.css";
import { UserContext } from "./UserContext";

function App() {
  const [eventList, setEventList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (!user) {
  //     window.location.href = "/";
  //   }
  // }, [user]);

  // useEffect(() => {
  //   fetch("http://localhost:3009/signin", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: "usmanaqadri2@gmail.com",
  //       password: "passy",
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setUser(res);
  //     });
  // }, []);

  useEffect(() => {
    try {
      fetch(`http://localhost:3009/user/${user.user}`)
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
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <>
          {" "}
          <h2>Welcome {user.name}!</h2> <h2>My Groups</h2>
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
        </>
      ) : (
        <h2>Please login or register ^</h2>
      )}
    </div>
  );
}

export default App;
