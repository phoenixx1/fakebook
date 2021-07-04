import React from "react";
import SidebarRow from "./SidebarRow";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar__container">
      {/* <SidebarRow title={user.displayName} src={user.photoURL} /> */}
      <SidebarRow
        title="COVID-19 Information Center"
        Icon="/icons/sidebar/localhospital.svg"
      />
      <SidebarRow title="Pages" Icon="/icons/sidebar/emojiflags.svg" />
      <SidebarRow title="Friends" Icon="/icons/sidebar/people.svg" />
      <SidebarRow title="Messenger" Icon="/icons/sidebar/chat.svg" />
      <SidebarRow title="Marketplace" Icon="/icons/sidebar/storefront.svg" />
      <SidebarRow title="Videos" Icon="/icons/sidebar/videolibrary.svg" />
      <SidebarRow title="More" Icon="/icons/sidebar/expandmore.svg" />
    </div>
  );
}

export default Sidebar;
