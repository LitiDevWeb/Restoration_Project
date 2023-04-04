import Container from "@webapp/components/container/container";
import Navbar from "@webapp/components/navbar/navbar";
import Navigation from "@webapp/components/navigation/navigation";
import PageTitle from "@webapp/components/page-title/page-title";
import Image from "next/image";
import styles from "./about.module.scss";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import classNames from "classnames";

const RoundNumber = ({ number, vertical = true }: { number: string; vertical?: boolean }) => {
  return (
    <div>
      <div className={styles["round-number-container"]}>
        <p>{number}</p>
      </div>
      {vertical && <div className={styles["vertical-line"]}></div>}
    </div>
  );
};

const WorkLine = ({ text }: { text: string }) => {
  return (
    <div className={styles["work-line"]}>
      <BsFillArrowRightSquareFill size={30} />
      <p>{text}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className={classNames(styles["container"], "scrollbar")}>
      <Navbar />
      <Container page="about-us">
        <Navigation />
        <div className={classNames(styles["container"], "scrollbar")}>
          <div className={styles["about-us-headline"]}>
            <PageTitle>
              <>
                About <span>Us</span>
              </>
            </PageTitle>
          </div>
          <div className={styles["about"]}>
            <div className={styles["image-container"]}>
              <Image alt="logo" src={"/images/Salim.png"} width={1920} height={1080} />
            </div>
            <div className={styles["text-container"]}>
              <div className={styles["subtext-container"]}>
                <div className={styles["title"]}>
                  <span>Welcome to</span>
                  <p>Fennec Restoration and Remodeling</p>
                </div>
                <p className={styles["description"]}>We are a licensed, bonded and insured residential contractors based in phoenix Arizona.</p>
                <div className={styles["work-attributes"]}>
                  <WorkLine text="High Quality Work." />
                  <WorkLine text="Remodeling Experts." />
                  <WorkLine text="Experienced Team." />
                  <WorkLine text="24/7 Help Support." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles["work"]}>
        <p className={styles["work-title"]}>
          Let&apos;s see how we <span>Work</span>
        </p>
        <div className={styles["work-box"]}>
          <div className={styles["base-1"]}>
            <div className={styles["work-steps"]}>
              <div className={styles["work-steps-line"]}>
                <RoundNumber number={"01"} />
                <p>Determinate Budget</p>
              </div>
              <div className={styles["work-steps-line"]}>
                <RoundNumber number={"02"} />
                <p>Draw An Adequate Design</p>
              </div>
              <div className={styles["work-steps-line"]}>
                <RoundNumber number={"03"} vertical={false} />
                <p>Shop The Materials</p>
              </div>
            </div>
          </div>
          <div className={styles["base-2"]}>
            <div className={styles["work-image"]}>
              <div>
                <div className={styles["yellow-banner"]}></div>
                <Image alt="logo" src={"/images/work-before-after.png"} width={1920} height={1080} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
