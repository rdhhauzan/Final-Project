import { useNavigate } from "react-router-dom";

const GamesCard = ({ game, gif }) => {
  const navigation = useNavigate();
  function changePic1() {
    document.getElementById(game.id).src = game.imgUrl;
  }
  function changePic2() {
    document.getElementById(game.id).src = gif;
  }
  return (
    <div
      className="w-full md:w-[240px] lg:w-[400px] inline-block cursor-pointer relative my-3 mr-3"
      onClick={() => navigation("/login")}
    >
      <img
        id={game.id}
        className="w-full h-auto block rounded-3xl transition-all"
        src={game.imgUrl}
        alt="testinggame"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-3xl opacity-0 hover:opacity-100 text-white"
        onMouseOver={() => {
          changePic2();
        }}
        onMouseOut={() => {
          changePic1();
        }}
      >
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {game.name}
        </p>
      </div>
    </div>
  );
};

export default GamesCard;
