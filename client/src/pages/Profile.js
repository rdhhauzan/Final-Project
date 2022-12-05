import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserById } from "../store/actions/action";

export default function Profile() {
	const dispatch = useDispatch();
	const navigation = useNavigate();
	const id = localStorage.getItem("id");

	const { userDetail } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchUserById(id));
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex xl:flex-row 2xs:flex-col text-slate-200 xl:w-full xl:min-h-screen font-poppins">
			<Link
				to="/home"
				className="flex flex-row gap-2 fixed p-5 text-xl hover:underline">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="flex justify-center self-center w-7 h-7">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				<p className="mb-1">Home</p>
			</Link>
			<div className="flex xl:flex-row 2xs:flex-col xl:gap-10 w-screen h-content 2xs:py-5 xl:px-5 2xs:px-2">
				<div className="flex flex-col w-full basis-1/4">
					<div className="flex mt-10 justify-center">
						<img
							src="https://i.imgur.com/qAFLT3Z.jpeg"
							className="w-40 h-40 rounded-full"
							alt="placeholder profile"></img>
					</div>
					<div className="flex mt-5 justify-center">
						<p>
							<strong>@{userDetail?.user?.username}</strong>
						</p>
					</div>
					<div className="flex mt-3 justify-center">
						<button
							className="btn rounded-full bg-[#D7385E] text-[#F8EFD4]"
							onClick={() => navigation("/profile/edit")}>
							{" "}
							Edit Profile
						</button>
					</div>
				</div>
				<div className="flex flex-col w-full basis-1/2 gap-3 xl:mt-0 md:mt-4">
					{userDetail?.user?.Posts.map((post) => {
						return (
							<div className="card w-full bg-primary rounded shadow-xl shadow-black flex justify-center">
								<div className="card-body text-start">
									<h2 className="card-title">@{userDetail?.user?.username}</h2>
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
					})}
				</div>
				<div className="flex flex-col xl:mt-0 2xs:mt-4 w-full basis-1/4 gap-3">
					{userDetail?.user?.UserGames.map((game) => {
						return (
							<div
								className="card xl:w-96 md:w-full h-auto flex justify-center"
								key={game.id}
								style={{
									backgroundImage: `url(${game.imgUrl})`,
									height: undefined,
									borderRadius: "3px",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
								}}>
								<div
									className="card-body items-center text-center"
									style={{
										height: "100%",
										width: "100%",
										borderRadius: "3px",
										backgroundColor: "rgba(0, 0, 0, 0.5	)",
									}}>
									<h2 className="card-title ">{game.name}</h2>

									<p className="text-slate-300">{game.aboutMe}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
