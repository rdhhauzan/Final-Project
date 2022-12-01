import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
	{
		path: "/profile",
		element: <Profile />,
	},
]);

export default router;
