import Button from "./Button";
import { useNavigate } from "react-router";
import styles from "../styles/hero.module.css";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className={`${styles.hero} w-full`} aria-labelledby="hero-heading">
      <img
        src="src/assets/images/traintrack.jpg"
        alt="Solnedgång över tågspår"
        role="img"
        loading="eager"
        width="100%"
        height="auto"
      />
      <div className={styles.heroSec}>
        <h1
          id="hero-heading"
          className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-6 lg:mb-8"
        >
          Drakiga äventyr & en tågtastisk tid!
        </h1>
        <Button
          text="Sök Resa"
          onClick={() => navigate("/booking")}
          aria-label="Sök efter tågresor"
        />
      </div>
    </section>
  );
};

export default HeroSection;
