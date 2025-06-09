import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer} role="contentinfo">
      <div className="grid grid-cols-2 gap-5 justify-items-center">
        <div>
          <h2 className="text-l md:text-xl" tabIndex={0}>
            Tåg och Drakar
          </h2>
          <address className={styles.adress}>
            Scandic St:Jörgen
            <br />
            Malmö
          </address>
        </div>

        <div>
          <h2 className="text-l md:text-xl flex items-start">Hitta oss på:</h2>
          <div className="grid grid-cols-3 gap-1 justify-items-center items-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besök vår Facebook-sida"
              title="Besök vår Facebook-sida"
            >
              <img
                className={styles.svg}
                src="src/assets/images/facebook.svg"
                alt="facebook logo"
              />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besök vår TikTok-sida"
              title="Besök vår TikTok-sida"
            >
              <img
                className={styles.svg}
                src="src/assets/images/tiktok.svg"
                alt="tiktok logo"
              />
            </a>
            <a
              href="https://bsky.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Besök vår Bluesky-sida"
              title="Besök vår Bluesky-sida"
            >
              <img
                className={styles.svg}
                src="src/assets/images/bluesky.svg"
                alt="bluesky logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
