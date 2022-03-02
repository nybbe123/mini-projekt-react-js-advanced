import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../../data";
import MiniLogo from "../Progress/MiniLogo";
import "./Challenge.css";

interface Props {
  saveNewChallengeData: (user: User) => void;
}

function ChallengeForm(props: Props) {
  const [userName, setUserName] = useState("");
  const [cigarettes, setCigarettes] = useState("");
  const [cigarettePrice, setCigarettePrice] = useState("");

  const userNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };


  const cigaretteInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCigarettes(e.target.value);
  };

  const cigarettePriceInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCigarettePrice(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const userData: User = {
      name: userName,
      cigarettes: Number(cigarettes),
      price: Number(cigarettePrice),
      start: new Date(),
    };
    console.log(userData);
    props.saveNewChallengeData(userData);
  };

  const [user, setUser] = useState([]);

  return (
    <form className="form-style" onSubmit={submitHandler}>
      <div>
        <MiniLogo />
      </div>
      <div className="form-container">
        <legend className="form-title">Start New Challenge</legend>
        <div className="form-inp">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={userNameInputHandler}
          />
        </div>
        <div className="form-smoke-container">
          <div className="form-inp-smoke">
            <label htmlFor="cigarettes">Cigarettes /day</label>
            <input
              type="number"
              name="cigarettes"
              id="cigarettes"
              onChange={cigaretteInputHandler}
            />
          </div>
          <div className="form-inp-smoke">
            <label htmlFor="price">Price /pack</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={cigarettePriceInputHandler}
            />
          </div>
        </div>
      </div>
      <div className="form-btn">
        <button onClick={() => setUser(user)} className="btn" type="submit">
          <span>CONFIRM</span>
        </button>
      </div>
    </form>
  );
}

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
}

export default ChallengeForm;
