import React from "react";

function Card(props) {
  return (
    <div className="my-card">
      <h3>{props.title}</h3>
      <a href={props.link}>
        <img src={props.imgUrl} alt={props.title} width="150px" />
      </a>
      <p className="card-desc">{props.desc}</p>
    </div>
  );
}

export default Card;
