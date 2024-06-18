import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonCheck = () => {
    console.log(email.current.value);
    console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredentials) => {
          const user = userCredentials.user;
          updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({ uid: uid, email: email, displayName: displayName })
            );
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredentials) => {
          const user = userCredentials.user;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = "User not found";
          setErrorMessage(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="Image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-10/12 md:w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80 text-white"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="p-4 my-4 w-full bg-black bg-opacity-70"
            type="text"
            placeholder="Name"
            required
          />
        )}
        <input
          className="p-4 my-4 w-full bg-black bg-opacity-70"
          type="email"
          ref={email}
          placeholder="Email Address"
        />
        <input
          className="p-4 my-4 w-full bg-black bg-opacity-70"
          type="password"
          ref={password}
          placeholder="Password"
        />
        <p className="text-red-600 font-bold">{errorMessage}</p>
        <button
          onClick={handleButtonCheck}
          className="p-4 my-6 bg-red-600 w-full rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 hover:text-slate-200 cursor-pointer transition-all"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up now."
            : "Already Registered? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
