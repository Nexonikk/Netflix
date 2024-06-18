import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileLogo from "../assets/images/profile.jpg";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showDropDownMenu = () => {
    return (
      <div className="absolute bg-zinc-950 text-white top-16 right-6  flex flex-col p-2 w-28">
        <div>
          {/* <h5 className="hover:text-gray-200">Account</h5> */}
          {/* <h5 className="hover:text-gray-200">Help Center</h5> */}
          <button
            className="flex justify-between hover:text-gray-200"
            onClick={handleSignOut}
          >
            Sign Out
            <PiSignOutBold
              className="m-1 hover:"
              onMouseOver={({ target }) => (target.style.color = "gray")}
              onMouseOut={({ target }) => (target.style.color = "white")}
              color="white"
            />
          </button>
        </div>
      </div>
    );
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <div className="absolute w-screen px-6 py-0.5 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-28 md:w-32"
        src="https://imgs.search.brave.com/iMK0bpQOHFE9qAS6J2UI9mfJ97x8nhrepANtIF_PSds/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1Mjku/cG5n"
        alt="Netflix logo"
      />

      {user && (
        <div className="flex -mx-4 md:mx-0 p-4">
          <img
            className="w-6 h-6 md:w-8 md:h-8"
            src={ProfileLogo}
            alt="Profile Icon"
          />
          <button className="m-2" onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? (
              <IoIosArrowDown
                className="cursor-pointer size-4 md:size-5"
                color="white"
              />
            ) : (
              <IoIosArrowUp
                className="cursor-pointer size-4 md:size-5"
                color="white"
              />
            )}
          </button>
          {isOpen && showDropDownMenu()}
        </div>
      )}
    </div>
  );
};

export default Header;
