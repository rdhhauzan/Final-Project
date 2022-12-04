import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserProfile from "../components/UserProfile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/profile/edit",
		element: <UserProfile />,
	},
	{
		path: "/home",
		element: <Home />,
	},
]);

export default router;
