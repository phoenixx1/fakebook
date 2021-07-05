import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "../../api/StateProvider";
import "./Feed.scss";
import db from "../../firebase";
import firebase from "firebase";
import axios from "axios";
import giphyAPI from "../../giphyAPI";

function MessageSender() {
  const [input, setInput] = useState("");
  const [GIFUrl, setGIFUrl] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [GIFResult, setGIFResult] = useState([]);
  const wrapperRef = useRef(null);
  const gifResultWrap = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: giphyAPI,
          q: GIFUrl,
        },
      });

      setGIFResult(response.data.data);
    };
    if (!validURL(GIFUrl)) {
      fetchData();
    }
  }, [GIFUrl]);

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        gifResultWrap.current &&
        validURL(GIFUrl)
      ) {
        gifResultWrap.current.style.visibility = "hidden";
        if (!validURL(GIFUrl)) {
          setGIFUrl("");
        }
      } else if (gifResultWrap.current && GIFUrl != "") {
        gifResultWrap.current.style.visibility = "visbile";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, gifResultWrap, GIFUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: GIFUrl,
    });
    setInput("");
    setGIFUrl("");
  };

  return (
    <div className="message__sender__container">
      <div className="message__sender__top">
        <img className="user__image" src={user.photoURL} />
        <form>
          <input
            className="message__sender__input"
            value={input}
            placeholder={`What's on our mind, ${user.displayName}`}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="gif__search" ref={wrapperRef}>
            <input
              className="gif__input"
              value={GIFUrl}
              onChange={(e) => setGIFUrl(e.target.value)}
              placeholder="Search GIF or Paste URL"
            />

            {GIFUrl ? (
              <div className="gifs__result" ref={gifResultWrap}>
                {GIFResult.map((values) => {
                  return (
                    <>
                      <img
                        key={values.id}
                        onClick={(e) => setGIFUrl(values.images.original.url)}
                        className="gif"
                        src={values.images.fixed_height_small.url}
                      />
                    </>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
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

      {GIFResult.map((values) => {
        return <>{/* <img src={values.images.original.url} /> */}</>;
      })}
    </div>
  );
}

export default MessageSender;
