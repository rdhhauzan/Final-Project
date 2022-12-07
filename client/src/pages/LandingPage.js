import styles from "../style";
import { Navbar, TemplateLanding, GamesCard, Footer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../store/actions/action";
import { useEffect } from "react";
import Features from "../components/Features";

const LandingPage = () => {
	const { games } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGames());
		// eslint-disable-next-line
	}, []);

	return (
		<div className="bg-primary w-full overflow-hidden">
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Navbar />
				</div>
			</div>

			<div className={`${styles.boxWidth}`}>
				<TemplateLanding />
			</div>
			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Features />
				</div>
			</div>
			<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
				<h2 className={`${styles.heading2}`}>GAMES</h2>
				<div className={`${styles.boxWidth}`}>
					{/* games card */}

					{games.map((game, index) => {
						return <GamesCard game={game} index={index} key={game.id} />;
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
