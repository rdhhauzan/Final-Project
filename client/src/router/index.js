import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/home",
		element: <Home />,
	},
]);

export default router;
