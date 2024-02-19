import { Navigate, Outlet } from "react-router-dom";
type authProps = {
  auth: boolean;
};
const Public = ({ auth }: authProps) => {
  return auth ? <Navigate to="/home" /> : <Outlet />;
};

export default Public;
