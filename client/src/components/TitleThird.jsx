import styles, { layout } from "../style";
import Button from "./Button";
import { star } from "../assets";

function TitleThird() {
  return (
    <section id="" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          I DONT KNOW WHAT TO <br className="sm:block hidden" /> TEXT KASIH
          SLOGAN KALI
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, iusto
          temporibus tempora dolore accusantium perspiciatis fugit voluptatibus
          soluta maiores dolor architecto impedit unde rerum eum nobis pariatur
          quas ab illum.
        </p>
        <Button styles="mt-10" />
      </div>
      <div className={`${layout.sectionImg} flex-col`}>
        {/* icon card */}
        <div className={`flex flex-row p-6 rounded-[20px] mb-6 feature-card`}>
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
          >
            <img
              src={star}
              alt="iconstar"
              className="w=[50%] h-[50%] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
              title example
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
              paragraph stuff
            </p>
          </div>
        </div>
        <div className={`flex flex-row p-6 rounded-[20px] mb-6 feature-card`}>
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
          >
            <img
              src={star}
              alt="iconstar"
              className="w=[50%] h-[50%] object-contain "
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
              title example
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
              paragraph stuff
            </p>
          </div>
        </div>
        <div className={`flex flex-row p-6 rounded-[20px] mb-6 feature-card`}>
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
          >
            <img
              src={star}
              alt="iconstar"
              className="w=[50%] h-[50%] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
              title example
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
              paragraph stuff
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TitleThird;
