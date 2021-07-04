import React, { useState } from "react";
import { useStateValue } from "../../api/StateProvider";
import "./Feed.scss";
import db from "../../firebase";
import firebase from "firebase";

function MessageSender() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: imgUrl,
    });
    setInput("");
    setImgUrl("");
  };

  return (
    <div className="message__sender__container">
      <div className="message__sender__top">
        <img src="https://avatars.githubusercontent.com/u/44865935?v=4" />
        <form>
          <input
            className="message__sender__input"
            value={input}
            placeholder={`What's on our mind, ${user.displayName}`}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="image URL (Optional)"
          />
          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
      </div>

      <div className="message__sender__bottom">
        <div className="message__sender__option">
          <img src="/icons/feed/videocam.svg" />
          <h3>Live Video</h3>
        </div>

        <div className="message__sender__option">
          <img src="/icons/feed/photolibrary.svg" />
          <h3>Photo/Video</h3>
        </div>

        <div className="message__sender__option">
          <img src="/icons/feed/insertemoticon.svg" />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
