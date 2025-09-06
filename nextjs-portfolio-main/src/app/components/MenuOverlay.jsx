import React from "react";
import NavLink from "./NavLink";
import { useRouter } from "next/router";


const MenuOverlay = ({ links, handleClose }) => {
  const router = useRouter;
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            onClick={(e) => {
              e.preventDefault(); // prevent default link jump
              if (link.isModal && typeof link.onModalOpen === 'function' ) {
                // Call the modal opener if provided
                  link.onModalOpen();
                }
                else if (typeof link.onClick === 'function') {
                  link.onClick(); // Handle custom actions like logout
                }
                else if(link.path.starsWith('#')){
                  router.push('/' + link.path);
                } else {
                  router.push(link.path); // Navigate to route like /profile
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
