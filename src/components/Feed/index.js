import React from "react";
import "./Feed.scss";
import MessageSender from "./MessageSender";

function Feed() {
  return (
    <div className="feed__container">
      <MessageSender />
    </div>
  );
}

export default Feed;
