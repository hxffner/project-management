import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import CalendarPage from "./pages/Calendar/CalendarPage";

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
          </Routes>
        </Content>
      </BrowserRouter>
    </>
  );
}

export default App;
