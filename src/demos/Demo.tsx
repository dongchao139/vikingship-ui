import React from "react";
import MouseTracker from "../hooks/MouseTracker";
import LikeButton from "../hooks/LikeButton";
import DogShow from "../hooks/DogShow";

function Demo(_props) {
  return (
    <>
      <MouseTracker />
      <hr />
      <LikeButton />
      <hr />
      <DogShow />
      <hr />
      <h1>Hello World</h1>
      <h2>Hello World</h2>
      <h3>Hello World</h3>
      <hr />
    </>
  )
}

export default Demo;