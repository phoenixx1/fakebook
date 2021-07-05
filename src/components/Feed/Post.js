import React from "react";
import "./Feed.scss";

function Post({ profilePic, image, username, timestamp, message }) {
  return (
    <div className="post__container">
      <div className="post__top">
        <img src={profilePic} />
        <div className="post__top__info">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <img src={image} alt="" className="post__image" />

      <div className="post__options">
        <div className="post__option">
          <img src="/icons/feed/thumbup.svg" />
          <p>Like</p>
        </div>

        <div className="post__option">
          <img src="/icons/feed/chatbubble.svg" />
          <p>Comment</p>
        </div>

        <div className="post__option">
          <img src="/icons/feed/nearme.svg" />
          <p>Share</p>
        </div>

        <div className="post__option">
          <img src="/icons/feed/accountcircle.svg" />
          <img src="/icons/feed/expandmore.svg" />
        </div>
      </div>
    </div>
  );
}

export default Post;
