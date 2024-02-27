import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../scenes/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSocketStore } from "../state/socket";
type authProps = {
  auth: boolean;
};

const Private = ({ auth }: authProps) => {

  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (auth) {
      connect();

      return () => {
        disconnect();
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <Toaster />
      {auth ? <Outlet /> : <Navigate to="/log-in" />}
    </>
  );
};

export default Private;
