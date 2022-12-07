import styles from "../style";
import nogs from "../assets/nogs.png";

const TemplateLanding = () => (
	<section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
		<div
			className={`flex-1 ${styles.flexStart} flex-col xl:px-16 xl:py-10 sm:px-16 px-6`}>
			<div className="flex flex-row justify-between items-center w-full ">
				<h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
					TEAM UP
				</h1>
			</div>

			<p className={`${styles.paragraph} max-w-[470px] mt-5 `}>
				Find the best personalized teammates and never play alone again!
			</p>
		</div>

		<div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
			<img
				src={nogs}
				alt="gambarapaaja"
				className="w-[100%] h-[100%] relative z-[5]"
			/>

			{/* NOTEEEEEE!!!! disini ada pink gradient dari index.css */}
			<div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"></div>
			<div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white"></div>
			<div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient"></div>
		</div>
	</section>
);

export default TemplateLanding;
