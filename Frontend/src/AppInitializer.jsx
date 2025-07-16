import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./features/authSlicer";

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null));
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AppInitializer;
