import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPosts,
	fetchUserById,
	fetchOnlineUsers,
	fetchGames,
	addPost,
} from "../store/actions/action";

export default function Home() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const id = localStorage.getItem("id");
	const { userDetail, posts, onlineUsers, games } = useSelector(
		(state) => state
	);
	const [postInput, setPostInput] = useState({
		title: "",
		content: "",
		GameId: "",
		image: "",
	});

	const handleChange = (e) => {
		let { name, value } = e.target;

		if (name === "image") {
			let image = e.target.files[0];
			value = image;
		}

		setPostInput({
			...postInput,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("title", postInput.title);
		formData.append("content", postInput.content);
		formData.append("GameId", postInput.GameId);
		formData.append("image", postInput.image);
		dispatch(addPost(formData));
	};

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchUserById(id));
		dispatch(fetchOnlineUsers());
		dispatch(fetchGames());
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
										<h2 className="card-title">
											@{userDetail?.user?.username}
										</h2>
										<p>{post.content}</p>
										<figure className="pt-5 w-64 h-64">
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
						// Welcome post from developer when first joining TeamUP
						<div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
							<div className="card-body text-start">
								<h2 className="card-title">@developer</h2>
								<p>
									Please add a game to play together with your new teammates!
									Never play alone, and share the joy to your post!{" "}
								</p>
								<figure className="pt-5">
									<img
										src="https://cdni.iconscout.com/illustration/premium/thumb/gamers-play-online-video-game-5071155-4231654.png"
										alt="Shoes"
										className="rounded-xl w-full"
									/>
								</figure>
								<div className="flex justify-end">
									<label
										htmlFor="modal-post"
										className="btn bg-[#D7385E] text-slate-200">
										Make a Post
									</label>

									{/* Modal post */}
									<form onSubmit={handleSubmit}>
										<input
											type="checkbox"
											id="modal-post"
											className="modal-toggle"
										/>
										<label
											htmlFor="modal-post"
											className="modal cursor-pointer">
											<label className="modal-box relative">
												<div>
													<h1 className="mb-2 text-2xl">
														{" "}
														Share your game result!{" "}
													</h1>
												</div>
												<div>
													<div className="flex">
														<p className="flex mr-5 items-center"> Title</p>
														<input
															name="title"
															onChange={handleChange}
															className="flex text-start my-3 w-full outline outline-1 rounded-sm"
														/>
													</div>
													<div className="flex justify-between my-3">
														<p className="my-1"> Content</p>
														<select
															name="GameId"
															onChange={handleChange}
															className="select select-bordered select-sm max-w-xs">
															<option disabled selected>
																{" "}
																Pick Games
															</option>
															{games.map((game) => {
																return (
																	<option value={game.id} key={game.id}>
																		{game.name}
																	</option>
																);
															})}
														</select>
													</div>
													<textarea
														name="content"
														onChange={handleChange}
														className="w-full outline outline-1 rounded-sm"
													/>
													<div className="flex justify-end gap-3 mt-2">
														<input
															className="hidden"
															type="file"
															name="image"
															onChange={handleChange}
															id="upload-image"
														/>
														<label
															htmlFor="upload-image"
															className="btn bg-[#D7385E] text-slate-200">
															{" "}
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={1.5}
																stroke="currentColor"
																className="w-6 h-6">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
																/>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
																/>
															</svg>
														</label>
														<button className="btn bg-[#D7385E] text-slate-200">
															{" "}
															Post{" "}
														</button>
													</div>
												</div>
											</label>
										</label>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
				{/* Profile + Online users + Group + Recommended Friends section */}
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
								<button
									className="btn btn-sm mx-1 rounded-full text-slate-200 font-normal mt-2 text-sm"
									onClick={() => navigation("/addgame")}>
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
