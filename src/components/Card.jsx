import PropTypes from "prop-types";
import styles from "../styles/card.module.css";


const Card = ({ alt, src, className, text, onClick }) => {
  return (
    <div
      className={`${className} ${styles.smallCard} ${styles.bigCard}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick && onClick(e);
        }
      }}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : "figure"}
      aria-label={text}
    >
      <img data-testid="card-image" alt={alt} src={src} />
      <div className={styles.overlay}>{text}</div>
    </div>
  );
};

Card.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default Card;
