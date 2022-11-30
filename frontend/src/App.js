import React, { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import "./App.css";
import { UserContext } from "./UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);
  const [eventList, setEventList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/about-us");
    }
  }, []);

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
    fetch(`${process.env.REACT_APP_API_SERVER}/user/${user?.user}`)
      .then((res) => res.json())
      .then((data) => {
        const myGroups = data.foundUser.myGroups;
        for (const group of myGroups) {
          try {
            fetch(`${process.env.REACT_APP_API_SERVER}/group/${group}`)
              .then((res) => res.json())
              .then((data) => {
                setGroupList((prevState) => {
                  if (
                    prevState.length !== 0 &&
                    prevState
                      .map((group) => group._id)
                      .includes(data.foundGroup._id)
                  ) {
                    return [...prevState];
                  } else {
                    return [...prevState, data.foundGroup];
                  }
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
        const myEvents = data.foundUser.myEvents;
        for (const event of myEvents) {
          try {
            fetch(`${process.env.REACT_APP_API_SERVER}/event/${event}`)
              .then((res) => res.json())
              .then((data) => {
                setEventList((prevState) => {
                  if (
                    prevState.length !== 0 &&
                    prevState
                      .map((event) => event?.id)
                      .includes(data.foundEvent.id)
                  ) {
                    return [...prevState];
                  } else {
                    return [...prevState, data.foundEvent];
                  }
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
  }, [user]);

  console.log("HERE IS EVENT LIST", eventList);
  console.log("HERE IS GROUP LIST", groupList);
  return (
    <div className="App">
      {user ? (
        <>
          {" "}
          <h1>Welcome {user.name}!</h1>
          <h2>My Groups</h2>
          {groupList.length === 0 && (
            <p>
              You're not part of any groups. Find a group to join{" "}
              <Link style={{ color: "blue" }} to={"/group"}>
                here!
              </Link>
            </p>
          )}
          <div className="group-grid">
            {groupList.map((group) => (
              <Card
                key={group._id}
                cardId={group._id}
                title={group.name}
                link={`/group/${group._id}`}
                imgUrl={group.img}
                desc={group.desc}
                type={"Group"}
                attribute={"myGroups"}
              />
            ))}
          </div>
          <h2>My Upcoming Events</h2>
          {eventList.length === 0 && (
            <p>
              You're not part of any events. Find an event to join{" "}
              <Link style={{ color: "blue" }} to={"/event"}>
                here!
              </Link>
            </p>
          )}
          <div className="group-grid">
            {eventList.map((event) => (
              <Card
                key={event._id}
                cardId={event._id}
                title={event.name}
                imgUrl={event.img}
                link={`/event/${event._id}`}
                desc={event.desc}
              />
            ))}
          </div>
        </>
      ) : (
        <Navigate to={"/about-us"} />
      )}
    </div>
  );
}

export default App;
