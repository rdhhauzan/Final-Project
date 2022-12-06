import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchPosts,
	fetchUserById,
	fetchOnlineUsers,
	payment,
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
									<div className="card-body text-start" key={post.id}>
										<h2 className="card-title">@{post?.User?.username}</h2>
										<p>{post.content}</p>
										<figure className="pt-5">
											<img
												src={post.imgUrl}
												alt="Shoes"
												className="rounded-xl w-full min-h-full"
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
				<div className="flex flex-col gap-3 w-full xl:mt-0 2xs:my-4 2xs:justify-start basis-4/12">
					<div className="flex card w-full bg-[#262525] rounded-sm">
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
								<div className="flex flex-row">
									<p className="mt-5">@{userDetail?.user?.username}</p>
									{userDetail?.user?.isPremium ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="yellow"
											className="w-4 h-4 mt-3">
											<path
												fillRule="evenodd"
												d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
												clipRule="evenodd"
											/>
										</svg>
									) : null}
								</div>

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
								{/* {userDetail?.user?.isPremium ? null : (
                  <button
                    className="btn btn-sm mx-1 rounded-full bg-[#303030] hover:scale-105 text-slate-200 font-normal mt-2 text-sm"
                    onClick={() => dispatch(payment())}
                  >
                    Go Premium
                  </button>
                )} */}
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
					{userDetail?.user?.isPremium ? null : (
						<div className="flex flex-col items-center justify-center bg-[#262525] shadow-md shadow-black rounded-sm">
							<p className="text-lg mt-3">
								{" "}
								Be a premium member to form a group!{" "}
							</p>
							<button
								className="btn btn-sm mx-1 rounded-full bg-[#D7385E] hover:scale-105 text-slate-200 font-normal my-2 text-sm"
								onClick={() => dispatch(payment())}>
								Go Premium
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
