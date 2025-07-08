"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import SignIn from "./Auth/SignIn";
import ModalWrapper from "./Auth/ModalWrapper";
import { getToken, remove_Token } from "@/services/LocalStoreService";
import { UnsetUserInfo } from "@/features/userSlice";
import { UnsetUserToken } from "@/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserLogOutMutation } from "@/services/userAuthAPI";

const Navbar = () => {
  const dispatch = useDispatch(); // ✅ ADD THIS
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [userLogOut] = useUserLogOutMutation();
  // const [isAuth, setIsAuth] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const access_token = useSelector((state) => state.auth.access_token);
  // const [isAuth, setIsAuth] = useState(null)
  const isAuth = !!access_token;

  // useEffect(()=>{
  //   const authCookie = Cookies.get('isAuth');
  //   setIsAuth(authCookie);
  // })

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleLogout = async () => {
    const { refresh_token, access_token } = getToken();
    // const refreshToken = localStorage.getItem('refresh_token');
    // console.log("Logging out with refresh token:", refresh_token);
    try {
      if (!refresh_token || !access_token) {
        // console.warn('No refresh token found.');
      } else {
        await userLogOut({
          refreshToken: refresh_token,
          accessToken: access_token,
        }).unwrap(); // optional: unwrap for better error handling;
      }
      // Clear authentication tokens
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
      // Clear tokens and Redux
      remove_Token();
      // Optionally, reset Redux state if using Redux for state management
      dispatch(UnsetUserToken({ access_token: null }));
      dispatch(UnsetUserInfo({ name: '', email: '' }));

      // Redirect to login page
      router.push('/');
    } catch (error) {
      // console.error('Logout failed', error);
    }
  };

  const navLinks = [
    { title: "About", path: "#about" },
    { title: "Projects", path: "#project" },
    { title: "Contact", path: "#contact" },
    ...(isAuth
      ? [{ title: "Profile", path: "/profile" },
      { title: "LogOut", path: "#", onClick: handleLogout }]
      :
      [{ title: "SignUp", path: "#", isModal: true, onModalOpen: handleModalOpen }]),
  ];

  const handleLinkClick = (e, link) => {
    // console.log("Clicked link:", link);
    // if (link.isModal || link.onClick || link.path.startsWith('#')) {
    //   e.preventDefault();
    // }
    if (link.isModal) {
      // console.log("Opening Modal...");
      handleModalOpen();
    }
    if (link.onClick) {
      // console.log("Calling onClick handler...");
      link.onClick();
    }
    if (link.path.startsWith('#')) {
      router.push('/' + link.path); // go to /#section from any route
    }
    setNavbarOpen(false); // always close mobile nav
  };

  return (
    <>
      <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-80 shadow-sm">
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
          <Link href="/" className="text-2xl md:text-5xl text-white font-semibold">
            LOGO
          </Link>


          {/* Mobile menu icon */}

          <div className="mobile-menu block md:hidden bg-[#121212]">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              {navbarOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex text-xs p-2 md:p-0 md:flex-row md:space-x-4 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    href={link.path}
                    title={link.title}
                    onClick={link.isModal || link.onClick ? (e) => handleLinkClick(e, link) : undefined
                    }
                  />
                </li>
              ))}

              {/* Theme Toggle (Sun Icon) */}
              {/* <li className="flex items-center">
                <button onClick={() => console.log("Theme toggle placeholder")}>
                  <Image
                    alt="Toggle Theme"
                    src={assets.sun_icon}
                    className="w-7 cursor-pointer ml-4"
                  />
                </button>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {navbarOpen && (
          <MenuOverlay
            links={navLinks}
            handleClose={() => setNavbarOpen(false)}
          // onLinkClick={handleLinkClick}
          />
        )}
      </nav>

      {/* Modal for SignUp/Login */}
      <ModalWrapper open={openModal} handleClose={handleModalClose}>
        <SignIn handleClose={handleModalClose} />
      </ModalWrapper>
    </>
  );
};

export default Navbar;
