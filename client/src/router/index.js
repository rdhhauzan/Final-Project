import { createBrowserRouter, redirect } from "react-router-dom";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserProfile from "../components/UserProfile";
import AddGame from "../pages/AddGame";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		loader: () => {
			if (localStorage.getItem("access_token")) return redirect("/home");
		},
	},
	{
		path: "/register",
		element: <Register />,
		loader: () => {
			if (localStorage.getItem("access_token")) return redirect("/");
		},
	},
	{
		path: "/login",
		element: <Login />,
		loader: () => {
			if (localStorage.getItem("access_token")) return redirect("/");
		},
	},
	{
		path: "/profile",
		element: <Profile />,
		loader: () => {
			if (!localStorage.getItem("access_token")) return redirect("/login");
		},
	},
	{
		path: "/profile/edit",
		element: <UserProfile />,
		loader: () => {
			if (!localStorage.getItem("access_token")) return redirect("/login");
		},
	},
	{
		path: "/home",
		element: <Home />,
		loader: () => {
			if (!localStorage.getItem("access_token")) return redirect("/login");
		},
	},
	{
		path: "/addgame",
		element: <AddGame />,
		loader: () => {
			if (!localStorage.getItem("access_token")) return redirect("/login");
		},
	},
]);

export default router;
