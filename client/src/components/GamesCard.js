import bocchi from "../assets/bocchi.jpg";

const GamesCard = ({ game }) => {
  return (
    <div className="w-full md:w-[240px] lg:w-[350px] inline-block cursor-pointer relative my-3 mr-3">
      <img
        className="w-full h-auto block rounded-3xl"
        src={bocchi}
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
