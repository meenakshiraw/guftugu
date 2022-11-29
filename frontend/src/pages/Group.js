import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function Group() {
  const { user } = useContext(UserContext);
  const [groupInfo, setGroupInfo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3009/group/${id}`)
      .then((res) => res.json())
      .then((data) => setGroupInfo(data.foundGroup));
  }, [id]);

  console.log("here is the group info", groupInfo);

  return (
    <div className="group-page">
      <h1>{groupInfo.name}</h1>
      <img src={groupInfo.img} alt={groupInfo.name} width="300px" />
      <p>{groupInfo.desc}</p>
      {user && user.isAdmin && (
        <button className="tertiary-button">Edit</button>
      )}
    </div>
  );
}

export default Group;
