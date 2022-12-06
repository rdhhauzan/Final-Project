import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPosts,
	fetchUserById,
	fetchOnlineUsers,
} from "../store/actions/action";
import ModalPost from "./ModalPost";
import Swal from "sweetalert2";

export default function Home() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const id = localStorage.getItem("id");
	const { userDetail, posts, onlineUsers } = useSelector((state) => state);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const logout = (e) => {
		e.preventDefault();
		localStorage.clear();
		Swal.fire({
			title: "Logged Out",
			text: "Please login to find friends to play with.",
			background: "#303030",
			color: "#FFFFFF",
			confirmButtonColor: "#D7385E",
		});
		navigation("/");
	};

	useEffect(() => {
		dispatch(fetchUserById(id));
		dispatch(fetchOnlineUsers());
		// eslint-disable-next-line
		console.log(onlineUsers);
	}, []);

	useEffect(() => {
		dispatch(fetchPosts());
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
										className="btn bg-[#D7385E] text-slate-200"
										onClick={handleShow}>
										Make a Post
									</label>
									<ModalPost key={userDetail.id} />
								</div>
							</div>
						</div>
					)}
				</div>
				{/* Profile + Online users + Group + Recommended Friends section */}
				<div className="flex flex-col w-full xl:mt-0 2xs:my-4 basis-4/12">
					<div className="card w-full bg-[#262525] rounded-sm flex">
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
									className="btn btn-sm mx-1 rounded-full bg-[#303030] hover:scale-105 text-slate-200 font-normal mt-2 text-sm"
									onClick={() => navigation("/profile")}>
									Profile
								</button>
								<button
									className="btn btn-sm mx-1 rounded-full bg-[#303030] hover:scale-105 text-slate-200 font-normal mt-2 text-sm"
									onClick={() => navigation("/addgame")}>
									Add a Game
								</button>
							</div>
							<button
								className="btn absolute right-0 bg-transparent border-0 rounded-md hover:bg-transparent hover:border-0"
								onClick={logout}>
								{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6 hover:scale-125">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/>
								</svg>
							</button>
						</div>
						{onlineUsers.map((onlineUser) => {
							return (
								<div className="card-body flex flex-row mx-5 justify-between text-start">
									<div className="flex flex-row gap-3">
										<img
											src={onlineUser.userData.profPict}
											className="self-center h-10 w-10"
											alt="profile pict"
										/>
										<p className="self-center">
											{onlineUser.userData.username}
										</p>
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
