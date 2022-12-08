import styles, { layout } from "../style";

function Features() {
	return (
		<section id="" className={layout.section}>
			<div className={layout.sectionInfo}>
				<h2 className={styles.heading2}>HIGHLIGHT FEATURES</h2>
			</div>

			<div className={`${layout.sectionImg} flex-col`}>
				<div className={layout.sectionInfo}>
					<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
						Find match with our matchmaking system. Communicate with them via
						chat, voice call <sup>*</sup>, or even video call <sup>*</sup>!
					</p>
					<p className={`${styles.paragraph} max-w-[470px] mt-5`}>
						Share your moments playing with them in a post.
					</p>
					<p className="font-poppins text-xs mt-2 text-slate-400">
						{" "}
						<sup>*</sup> You can only make group & initiate a 1-on-1 call on
						premium subcription.
					</p>
				</div>
			</div>
		</section>
	);
}

export default Features;
