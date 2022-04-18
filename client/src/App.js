import "./App.css";
// import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
function App() {
  return (
    <BrowserRouter>
      <div className="rootpage">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
