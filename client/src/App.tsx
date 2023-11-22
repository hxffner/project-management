import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Settings from "./pages/Profile/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Content>
          <Routes>
            <Route path={`/calendar`} element={<CalendarPage />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/register`} element={<RegisterPage />} />
            <Route path={`/profile/:username`} element={<ProfilePage />} />
            <Route path={`/profile/:username/settings`} element={<Settings />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </>
  );
}

export default App;
