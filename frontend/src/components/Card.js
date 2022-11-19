import React from "react";

function Card(props) {
  return (
    <div className="my-card">
      <h3>{props.title}</h3>
      <img src={props.imgUrl} alt={props.title} width="150px" />
      <p className="card-desc">{props.desc}</p>
    </div>
  );
}

export default Card;
