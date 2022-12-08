import styles from "../style";
import { Navbar, TemplateLanding, GamesCard, Footer } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../store/actions/action";
import { useEffect } from "react";
import Features from "../components/Features";
import mlbb from "../assets/gameGifs/mlbb.gif";
import lol from "../assets/gameGifs/lol.gif";
import valo from "../assets/gameGifs/valo.gif";
import apex from "../assets/gameGifs/apex.gif";

const LandingPage = () => {
  const { games } = useSelector((state) => state);
  const dispatch = useDispatch();
  const gif = [mlbb, apex, valo, lol];

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
      <div
        className={`bg-primary ${styles.paddingX} ${styles.flexStart} h-52 xl:mb-2 md:mb-2 sm:mb-96 xs:mb-96`}
      >
        <h2 className={`${styles.heading2}`}>GAMES</h2>
        <div className={`${styles.boxWidth}`}>
          {/* games card */}

          {games.map((game, index) => {
            return (
              <GamesCard
                game={game}
                index={index}
                key={game.id}
                gif={gif[index]}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
