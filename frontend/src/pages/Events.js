import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/event/`)
      .then((res) => res.json())
      .then((data) => setEvents([...data.events]));
  }, []);

  return (
    <div className="group-grid">
      {events.map((event) => (
        <>
          <Card
            key={event._id}
            cardId={event._id}
            title={event.name}
            link={`/event/${event._id}`}
            imgUrl={event.img}
            desc={event.desc}
            type={"event"}
            attribute={"myEvents"}
          />
        </>
      ))}
    </div>
  );
}

export default Events;
