import { useState } from "react";
import { myContext } from "./context";

export const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    global: {
      token: "",
      name: "",
      search: "",
      movie: {}
    },
  });

  const SetAuth = (target, payload) => {
    setState((prevState) => ({
      ...prevState,
      global: {
        ...state.global,
        [target]: payload,
      },
    }));
  };

  return (
    <myContext.Provider value={{ state, SetAuth }}>
      {children}
    </myContext.Provider>
  );
};