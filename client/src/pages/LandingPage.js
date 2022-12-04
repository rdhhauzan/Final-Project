import styles from "../style";
import { Navbar, TemplateLanding, GamesCard, Footer } from "../components";

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
					<TemplateLanding />
				</div>
			</div>
			<div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth} `}>
					<GamesCard />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
