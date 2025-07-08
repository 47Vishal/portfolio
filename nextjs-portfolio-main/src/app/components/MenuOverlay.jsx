import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, handleClose }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            onClick={(e) => {
              e.preventDefault(); // prevent default link jump
              if (link.isModal) {
                // Call the modal opener if provided
                if (typeof link.onModalOpen === 'function') {
                  link.onModalOpen();
                }
              }
              handleClose(); // always close the menu
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
