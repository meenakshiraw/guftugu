import React, { useEffect, useState, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Event() {
  const [eventInfo, setEventInfo] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/event/${id}`)
      .then((res) => res.json())
      .then((data) => setEventInfo(data.foundEvent));
  }, [id]);

  const joinEvent = () => {
    const reqBody = [...user.myEvents, id];
    fetch(`${process.env.REACT_APP_API_SERVER}/user/${user.user}`, {
      method: "PUT",
      body: JSON.stringify({ myEvents: reqBody }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser({
            user: data._id,
            name: data.name,
            myEvents: data.myEvents,
            myGroups: data.myGroups,
            isAdmin: data.isAdmin,
            loggedIn: true,
          });
        }
      });
  };
  const leaveEvent = async () => {
    const reqBody = user.myEvents.filter((event) => event !== id);
    fetch(`${process.env.REACT_APP_API_SERVER}/user/${user.user}`, {
      method: "PUT",
      body: JSON.stringify({ myEvents: reqBody }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser({
            user: data._id,
            name: data.name,
            myEvents: data.myEvents,
            myGroups: data.myGroups,
            isAdmin: data.isAdmin,
            loggedIn: true,
          });
        }
      });
  };

  const handleDelete = async () => {
    await leaveEvent();
    fetch(`${process.env.REACT_APP_API_SERVER}/event/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((res) => {
        navigate("/event");
      });
  };
  return (
    <div className="event-page">
      <h1>{eventInfo.name}</h1>
      <img src={eventInfo.img} alt={eventInfo.name} width="200px" />
      <h3>{eventInfo.desc}</h3>
      <h4>
        Date:{" "}
        {new Date(eventInfo.date).toLocaleDateString() +
          "\t" +
          new Date(eventInfo.date).toLocaleTimeString()}
      </h4>
      {user && (
        <div className="event-rsvp">
          {!user.myEvents.includes(id) ? (
            <button onClick={joinEvent}>RSVP to event</button>
          ) : (
            <>
              <p>
                You are registered for this event{" "}
                <CheckIcon sx={{ color: "green" }} />
              </p>
              <button className="secondary-button" onClick={leaveEvent}>
                LEAVE event
              </button>
            </>
          )}
        </div>
      )}
      {user && user.myEvents.includes(id) && (
        <>
          {" "}
          <h4>Meeting Code: {eventInfo.meetingCode}</h4>
          <h4>Password: {eventInfo.meetingPswd}</h4>
          <a href={eventInfo.meetingURL}>
            <h4 style={{ color: "blue" }}>Link to join</h4>
          </a>
        </>
      )}
      {user && (
        <button onClick={handleDelete} className="secondary-button">
          Delete
        </button>
      )}
    </div>
  );
}

export default Event;
