import React from "react";
import { actionTypes } from "../../api/reducer";
import { useStateValue } from "../../api/StateProvider";
import { auth, provider } from "../../firebase";
import "./Header.scss";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const signOut = () => {
    console.log("logout");
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="header__container">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png"
          alt=""
        />
        <div className="header__input">
          <img src="/icons/header/search.svg" alt="searchIcon" />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>

      <div className="header__center">
        <div className="header__option --active">
          <img src="/icons/header/home.svg" alt="homeIcon" />
        </div>

        <div className="header__option">
          <img src="/icons/header/flag.svg" alt="flagIcon" />
        </div>

        <div className="header__option">
          <img src="/icons/header/subscriptions.svg" alt="subscriptionsIcon" />
        </div>

        <div className="header__option">
          <img src="/icons/header/storefront.svg" alt="storefrontIcon" />
        </div>

        <div className="header__option">
          <img
            src="/icons/header/superviseduser.svg"
            alt="superviseduserIcon"
          />
        </div>
      </div>

      <div className="header__right">
        <div className="header__info">
          <img src={user.photoURL} />
          <h4>{user.displayName}</h4>
        </div>

        <div className="icon__button">
          <img src="/icons/header/add.svg" alt="addIcon" />
        </div>
        <div className="icon__button">
          <img src="/icons/header/forum.svg" alt="forumIcon" />
        </div>
        <div className="icon__button">
          <img
            src="/icons/header/notificationsactive.svg"
            alt="notificationsactive"
          />
        </div>
        <div className="icon__button" onClick={signOut}>
          <img src="/icons/header/logout.svg" alt="logoutIcon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
