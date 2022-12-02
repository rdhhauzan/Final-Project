import styles from "../style";
import {
	Navbar,
	Title,
	TitleThird,
	TitleFourth,
	TitleFifth,
	Footer,
} from "../components";

const LandingPage = () => {
	return (
		<div className="bg-primary w-full overflow-hidden">
			<div className={`${styles.paddingX} ${styles.flexCenter}`}>
				<div className={`${styles.boxWidth}`}>
					<Navbar />
				</div>
			</div>

			<div className={`bg-primary ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Title />
				</div>
			</div>
			<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth} `}>
					<TitleThird />
					<TitleFourth />
					<TitleFifth />
					{/* KALO DIPERLUKAN */}
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
