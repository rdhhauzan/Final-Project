import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPosts,
	fetchUserById,
	fetchOnlineUsers,
} from "../store/actions/action";

export default function Home() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const id = localStorage.getItem("id");
	const { userDetail, posts, onlineUsers } = useSelector((state) => state);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUserById(id));
		dispatch(fetchOnlineUsers());
		setLoading(true);
		if (localStorage.getItem("access_token")) {
			window.CometChatWidget.init({
				appID: "2269480a5983d987",
				appRegion: "us",
				authKey: "a0b27f305eaed800bd7330c21a90db380a970e4e",
			}).then(
				(response) => {
					console.log("Initialization completed successfully");
					//You can now call login function.
					window.CometChatWidget.login({
						uid: localStorage.getItem("uuid"),
					}).then(
						(response) => {
							window.CometChatWidget.launch({
								widgetID: "bf899074-3999-4b4f-b173-1a680d708768",
								docked: "true",
								alignment: "right", //left or right
								roundedCorners: "true",
								height: "450px",
								width: "400px",
							});
						},
						(error) => {
							console.log("User login failed with error:", error);
							//Check the reason for error and take appropriate action.
						}
					);
				},
				(error) => {
					console.log("Initialization failed with error:", error);
					//Check the reason for error and take appropriate action.
				}
			);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex xl:flex-row 2xs:flex-col-reverse font-poppins text-[#FFFFFF] w-full min-h-screen font-chakra">
			<div className="flex xl:flex-row 2xs:flex-col-reverse xl:gap-10 2xs:gap-5 w-screen h-content 2xs:py-5 xl:py-10 xl:px-12 2xs:px-8">
				<div className="flex flex-col w-full mt-0 basis-8/12 gap-3">
					{posts.length > 0 ? (
						posts.map((post) => {
							return (
								<div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
									<div className="card-body text-start">
										<h2 className="card-title">@{userDetail.user.username}</h2>
										<p>{post.content}</p>
										<figure className="pt-5">
											<img
												src={post.imgUrl}
												alt="Shoes"
												className="rounded-xl w-full"
											/>
										</figure>
									</div>
								</div>
							);
						})
					) : (
						<p> Please add a game to start your journey! </p>
					)}
				</div>
				<div className="flex flex-col w-full xl:mt-0 2xs:my-4 basis-4/12">
					<div className="card w-full bg-[#303030] rounded-sm flex">
						<div className="card-title sticky top-0 items-start bg-[#D7385E]">
							<div>
								<figure className="flex">
									<img
										src="https://i.imgur.com/qAFLT3Z.jpeg"
										alt="Shoes"
										className="mx-5 my-3 w-20 h-20 rounded-full"
									/>
								</figure>
							</div>
							<div>
								<p className="mt-5">@{userDetail?.user?.username}</p>
								<button
									className="btn btn-sm mx-1 rounded-full text-slate-200 font-normal mt-2 text-sm"
									onClick={() => navigation("/profile")}>
									Profile
								</button>
								<button className="btn btn-sm mx-1 rounded-full text-slate-200 font-normal mt-2 text-sm">
									Add a Game
								</button>
							</div>
						</div>
						{onlineUsers.map((onlineUser) => {
							return (
								<div className="card-body flex flex-row mx-5 justify-between text-start">
									<div className="flex flex-row gap-3">
										<img
											src={onlineUser.profPict}
											className="self-center h-10 w-10"
											alt="profile pict"
										/>
										<p className="self-center">{onlineUser.username}</p>
									</div>
									<div className="flex items-end text-end">
										<button className="btn btn-primary rounded-sm">+</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
