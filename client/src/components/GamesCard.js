import { useNavigate } from "react-router-dom";

const GamesCard = ({ game }) => {
	const navigation = useNavigate();
	return (
		<div
			className="w-full md:w-[240px] lg:w-[400px] inline-block cursor-pointer relative my-3 mr-3"
			onClick={() => navigation("/login")}>
			<img
				className="w-full h-auto block rounded-3xl"
				src={game.imgUrl}
				alt="testinggame"
			/>
			<div className="absolute top-0 left-0 w-full h-full bg-black/80 rounded-3xl opacity-100 text-white">
				<p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
					{game.name}
				</p>
			</div>
		</div>
	);
};

export default GamesCard;
