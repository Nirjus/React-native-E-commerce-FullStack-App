import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useReduxStateHook = () => {
  const { loading, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({
        type: "CLEAR_ERROR",
      });
    }
    if (message) {
      alert(message);
      dispatch({
        type: "CLEAR_MESSAGE",
      });
    }
  }, [error, message, dispatch]);
  return loading;
};
