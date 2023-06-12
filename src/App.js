import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ < Home /> } />
          <Route path="/profile" element={ < Profile /> } />
          <Route path="/offers" element={ < Offers /> } />
          <Route path="/sign-in" element={ < SignIn /> } />
          <Route path="/sign-up" element={ < SignUp /> } />
          <Route path="/forgot-password" element={ < ForgotPassword /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
