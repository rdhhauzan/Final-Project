import styles from "../style";
import teamupnologo from "../assets/teamupnologo.png";
const Footer = () => {
	return (
		<section
			className={`${styles.flexCenter} ${styles.paddingY} xl:px-5 flex-col`}>
			<div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
				<div className="flex-1 flex flex-col justify-start mr-10">
					<img
						src={teamupnologo}
						alt="teamup"
						className="w-[250px] h-100% object-contain"
					/>
					<p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
						Brought to you by gamers, for gamers.
					</p>
				</div>
			</div>
			{/* copyright text */}
			<div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border=t-[#3F3E45]">
				<p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
					2022 Jakarta. All Rights Reserved
				</p>
			</div>
		</section>
	);
};

export default Footer;
