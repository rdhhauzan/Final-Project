import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../store/actions/action";

export default function ModalMatchmaking() {
	const dispatch = useDispatch();
	const { games } = useSelector((state) => state);

	const [show, setShow] = useState(false);

	useEffect(() => {
		dispatch(fetchGames());
	}, []);

	return (
		<form>
			<input type="checkbox" id="modal-matchmaking" className="modal-toggle" />
			<label htmlFor="modal-matchmaking" className="modal cursor-pointer">
				<label className="modal-box relative">
					<div>
						<h1 className="mb-2 text-2xl">
							{" "}
							Pick a game to start matchmaking!{" "}
						</h1>
					</div>
					<div>
						<div className="flex flex-wrap justify-center gap-5 my-3">
							{games.map((game) => {
								return (
									<button className="w-52 h-auto hover:scale-105" key={game.id}>
										<img className="" src={game.imgUrl} />
									</button>
								);
							})}
						</div>

						<label
							className="btn bg-[#D7385E] text-slate-200"
							htmlFor="modal-matchmaking">
							START MATCHMAKING
						</label>
					</div>
				</label>
			</label>
		</form>
	);
}
