import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import ProfilePage from "./scenes/profilePage";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { theState } from "./state/index";
import Public from "./Layout/Public";
import Private from "./Layout/Private";
import RegisterForm from "./scenes/loginPage/RegisterForm";
import LoginForm from "./scenes/loginPage/LoginForm";
import Followers from "./scenes/follower/Index";

import Notifications from "./scenes/notification/Index";

function App() {
  const { theme, auth } = theState();
  const Ctheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={Ctheme}>
          <CssBaseline />

          <Routes>
            <Route
              path="/"
              element={<Navigate to={auth ? "/home" : "/log-in"} />}
            />

            <Route element={<Public auth={auth} />}>
              <Route path="/log-in" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>
            <Route element={<Private auth={auth} />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userName" element={<ProfilePage />} />
              <Route path="/followers/:userId" element={<Followers />} />
              <Route
                path="/notifications"
                element={
                  <div style={{ margin: "5rem 0" }}>
                    <Notifications />
                  </div>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
