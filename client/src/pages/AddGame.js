import Apex from "../assets/gameImg/Apex.png";
import LOL from "../assets/gameImg/LOL.png";
import MLBB from "../assets/gameImg/MLBB.png";
import Valo from "../assets/gameImg/Valo.png";
import { useState } from "react";
export default function AddGame() {
  const { clicked, setClicked } = useState;
  return (
    <div className="overflow-hidden h-screen flex flex-col justify-center bg-add-game-bg">
      <div className="m-5 rounded-xl w-5/6 self-center flex flex-col bg-primary bg-opacity-95 py-10">
        <p className="text-2xl font-poppins font-medium self-center">
          What game are you going to play?
        </p>
        <div className="flex justify-center">
          <div className="flex flex-wrap w-11/12 justify-around">
            <a href="#" className="w-128 h-fit scale:75 rounded-2xl">
              <img
                src={Apex}
                className="scale-75 rounded-2xl hover:scale-90 transition-transform"
              />
            </a>

            <a href="#" className="w-128 h-fit scale:75 rounded-2xl">
              <img
                src={LOL}
                className="scale-75 rounded-2xl hover:scale-90 transition-transform"
              />
            </a>
            <a href="#" className="w-128 h-fit scale:75 rounded-2xl">
              <img
                src={MLBB}
                className="scale-75 rounded-2xl hover:scale-90 transition-transform"
              />
            </a>
            <a href="#" className="w-128 h-fit scale:75 rounded-2xl">
              <img
                src={Valo}
                className="scale-75 rounded-2xl hover:scale-90 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
      {/* <div className="m-5 rounded-xl w-5/6 self-center flex flex-col bg-primary py-10">
        <p className="text-2xl font-poppins font-normal self-center">
          What role do you prefer to play?
        </p>
      </div> */}
    </div>
  );
}
