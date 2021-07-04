import React from "react";
import "./Sidebar.scss";

function SidebarRow({ title, src, Icon }) {
  return (
    <div className="sidebar__row__container">
      {src && <img src={src} />}
      {Icon && <img src={Icon} />}

      <h4>{title}</h4>
    </div>
  );
}

export default SidebarRow;
