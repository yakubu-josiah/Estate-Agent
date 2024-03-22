import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import Offers from "./pages/Offers";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./pages/auth/AuthGuard";
import NewListing from "./pages/user/NewListings";
import EditListing from "./pages/user/EditListing";
import Listing from "./pages/Listing";
import ListingCategory from "./pages/ListingCategory";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<AuthGuard />}>
            <Route index element={<Profile />} />
            <Route path="/profile/add-new-listing" element={<NewListing />} />
            <Route path="/profile/listing/:listingId/edit" element={<EditListing />} />
          </Route>

          <Route path="/offers/category/listings/all-offers" element={<Offers />} />
          <Route path="/offers/category/listings/:categoryName" element={<ListingCategory />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile/listing/:listingId" element={<Listing />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
