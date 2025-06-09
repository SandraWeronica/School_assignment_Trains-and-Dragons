import styles from "../styles/about.module.css";

const About = () => {
  return (
    <section className={styles.container} aria-labelledby="about-heading">
      <article className="imageContainer">
        <img
          src="/src/assets/images/about_img.jpg"
          alt="Drakar & Tåg team members"
          className={styles.profileImage}
        />
      </article>

      <div className={styles.background}>
        <section className={styles.profileSection}>
          <h2 id="about-heading">Vi är Drakar & Tåg</h2>
          <p>
            Ett unikt företag som förenar vår passion för tåg och den mystiska
            världen av drakar. Företaget grundades av tre visionärer – Martin
            Nilsson, David Johansson och Elin Andersson – som alla delar en
            stark kärlek för både äventyr och kultur.{" "}
          </p>
        </section>

        <section aria-label="Team members">
          <article>
            <h2>Martin Nilsson</h2>
            <p>
              Martin, en tågälskare med en lång karriär inom transport och
              logistik, har alltid velat skapa en tågupplevelse som inte bara
              handlar om att resa, utan om att upptäcka och uppleva något
              extraordinärt.
            </p>
          </article>

          <article>
            <p>
              David, en expert på kinesisk mytologi och tradition, har haft en
              livslång fascination för drakar och deras symbolik som kraft och
              tur.
            </p>
            <h2>David Johansson</h2>
            <p>
              David, en expert på kinesisk mytologi och tradition, har haft en
              livslång fascination för drakar och deras symbolik som kraft och
              tur.
            </p>
          </article>

          <article>
            <h2>Elin Andersson</h2>
            <p>
              Elin, som har en bakgrund inom turism och eventplanering, har
              alltid drömt om att skapa upplevelser som inspirerar och
              förtrollar människor på ett oväntat sätt.
            </p>
          </article>
        </section>

        <article>
          <h2>Vår historia</h2>
          <p>
            När de tre möttes 2016 och började diskutera sina drömmar och idéer,
            insåg de snabbt att deras olika bakgrunder och passioner
            kompletterade varandra perfekt. Så föddes Drakar & Tåg – en plats
            där resor och mytologi möts och skapar magiska upplevelser för alla
            sinnen.
          </p>
          <p>
            Vår resa har bara börjat!Från våra första tågresor med draktema till
            de fantastiska nyårsfirandena, fortsätter vi att utveckla nya och
            spännande sätt att ge våra passagerare en unik och minnesvärd resa.
            För oss handlar det inte bara om att ta dig från A till B – det
            handlar om att ta dig på en resa full av äventyr, magi och mystik.
            Vår resa har bara börjat! Från våra första tågresor med draktema
            till de fantastiska nyårsfirandena, fortsätter vi att utveckla nya
            och spännande sätt att ge våra passagerare en unik och minnesvärd
            resa. För oss handlar det inte bara om att ta dig från A till B –
            det handlar om att ta dig på en resa full av äventyr, magi och
            mystik.
          </p>
          <p className={styles.conclusionText}>
            Välkommen att föra och resa med oss — där drakar och tåg möts!
          </p>
        </article>
      </div>
    </section>
  );
};

export default About;
