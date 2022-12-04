import styles, { layout } from "../style";
import bocchi from "../assets/bocchi.jpg";

const TitleFourth = () => {
  return (
    <section id="" className={layout.section}>
      <div className={`$${layout.section}`}>
        <h2 className={`${styles.heading2}`}>GAMES</h2>
        {/* games card */}
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
        <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
          <img
            className="w-full h-auto block rounded-3xl"
            src={bocchi}
            alt="testinggame"
          />
          <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:rounded-3xl opacity-0 hover:opacity-100 text-white">
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
              leage of legend
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TitleFourth;
