import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchGames } from "../store/actions/action";
import Swal from "sweetalert2";

export default function ModalPost() {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const { games } = useSelector((state) => state);
	const [postInput, setPostInput] = useState({
		title: "",
		content: "",
		GameId: "1",
		image: "",
	});

	const [show, setShow] = useState(false);

	useEffect(() => {
		dispatch(fetchGames());
	}, []);

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
		if (
			postInput.title === "" ||
			postInput.content === "" ||
			postInput.GameId === ""
		) {
			Swal.fire({
				title: "Fields cannot be empty!",
				icon: "warning",
				text: "Please fill in all the fields to post!",
				background: "#303030",
				color: "#FFFFFF",
				confirmButtonColor: "#D7385E",
				confirmButtonText: "OK",
			});
		} else {
			let formData = new FormData();
			formData.append("title", postInput.title);
			formData.append("content", postInput.content);
			formData.append("GameId", postInput.GameId);
			if (postInput.image) formData.append("image", postInput.image);

			dispatch(addPost(formData))
				.then(() => {
					navigation("/home");
					setPostInput({
						title: "",
						content: "",
						GameId: "1",
						image: "",
					});
					setShow(false);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="checkbox"
				id="modal-post"
				className="modal-toggle"
				onClick={() => setShow(true)}
			/>
			<label htmlFor="modal-post" className="modal cursor-pointer">
				<label className="modal-box relative">
					<div>
						<h1 className="mb-2 text-2xl"> Share your game result! </h1>
					</div>
					<div>
						<div className="flex">
							<p className="flex mr-5 items-center"> Title</p>
							<input
								name="title"
								value={postInput.title}
								onChange={handleChange}
								className="flex text-start my-3 w-full outline outline-1 rounded-sm"
							/>
						</div>
						<div className="flex justify-between my-3">
							<p className="my-1"> Content</p>
							<select
								name="GameId"
								value={postInput.GameId}
								onChange={handleChange}
								className="select select-bordered select-sm max-w-xs">
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
							value={postInput.content}
							onChange={handleChange}
							className="w-full outline outline-1 rounded-sm"
						/>
						<div className="flex justify-end gap-3 mt-2">
							<input
								className="hidden"
								type="file"
								name="image"
								value={postInput.image}
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
	);
}
