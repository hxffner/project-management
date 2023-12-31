import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Settings from "./pages/Profile/Settings";
import HomePage from "./pages/Home/HomePage";
import ProjectPage from "./pages/Project/ProjectPage";
import ProjectDetailPage from "./pages/Project/ProjectDetailPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Sidebar />
          <Content>
            <Routes>
              <Route path={`/`} element={<HomePage />} />
              <Route path={`/calendar`} element={<CalendarPage />} />
              <Route path={`/project`} element={<ProjectPage />} />
              <Route
                path={`/project/:projectId`}
                element={<ProjectDetailPage />}
              />
              <Route path={`/login`} element={<LoginPage />} />
              <Route path={`/register`} element={<RegisterPage />} />
              <Route path={`/profile/:username`} element={<ProfilePage />} />
              <Route
                path={`/profile/:username/settings`}
                element={<Settings />}
              />
            </Routes>
            <ToastContainer />
          </Content>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
