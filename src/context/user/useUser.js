import { use } from "react";
import UserContext from "./UserContext";

const useUser = () => {
  return use(UserContext);
};

export default useUser;
