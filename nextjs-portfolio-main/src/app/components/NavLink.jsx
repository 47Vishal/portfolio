import Link from "next/link";
import React from "react";

const NavLink = ({ href, title, onClick }) => {
  // If there's a custom click handler, treat this as a non-routing link (e.g., modal trigger)
  const isCustomClick = typeof onClick === "function";
  // console.log(`Rendering NavLink: ${title} → ${href}`);
  const baseClass = "block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white";

   // Normalize in-page links to always go to the homepage
  const isAnchorLink = href?.startsWith("#");
  const normalizedHref = isAnchorLink ? `/${href}` : href;

  if (isCustomClick) {
    return (
      <button
      aria-label={title}  // Improve screen reader support for modal and logout triggers:
        onClick={(e) =>{
          e.preventDefault(); // Prevent default anchor behavior
          onClick(e); // Call the provided onClick handler
        }}
      className={`${baseClass} cursor-pointer bg-transparent border-none`}
      >
        {title}
      </button>
    );
  }

  // Else treat as regular navigation link
  return (
    <Link
      href={normalizedHref}
      className={baseClass}
      >
      {title}
    </Link>
  );
};

export default NavLink;
