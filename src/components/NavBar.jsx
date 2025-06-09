import { NavLink, useNavigate } from "react-router";
import Button from "./Button";
import styles from "../styles/header.module.css";
import useUser from "../context/user/useUser";
import useBooking from "../context/booking/useBooking";
import { useEffect, useState, useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useUser();
  const { resetBookingState } = useBooking();
  const [openMenu, setOpenMenu] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const menuRef = useRef(null);

  const handleBookingLinkClick = () => {
    resetBookingState();
    setOpenMenu(false);
  };

  const logInButton = isLoggedIn ? (
    <Button text="Logga ut" onClick={logout} />
  ) : (
    <Button text="Logga in" onClick={() => navigate("/logIn")} />
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWindowSize("s");
      } else {
        setWindowSize("m");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        openMenu
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        <ul>
          <li>
            <NavLink
              to="/"
              aria-label="Home page"
              onClick={() => setOpenMenu(false)}
            >
              <h1 className={styles.logo}>
                <img
                  src="src/assets/images/dragon-train.PNG"
                  alt="Dragon Train logo"
                  width="100"
                  height="50"
                />
              </h1>
            </NavLink>
          </li>
        </ul>
        {windowSize === "s" && (
          <>
            <div>
              {openMenu && (
                <ul className={styles.linkWrapper} ref={menuRef} role="menu">
                  <li role="none">
                    <NavLink
                      to="/"
                      className={styles.link}
                      onClick={() => setOpenMenu(false)}
                      role="menuitem"
                    >
                      Hem
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink
                      to="/booking"
                      className={styles.link}
                      onClick={handleBookingLinkClick}
                      role="menuitem"
                    >
                      Sök resa
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink
                      to="/about"
                      className={styles.link}
                      onClick={() => setOpenMenu(false)}
                      role="menuitem"
                    >
                      Om oss
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink
                      to="/profile"
                      className={styles.link}
                      onClick={() => setOpenMenu(false)}
                      role="menuitem"
                    >
                      Din profil
                    </NavLink>
                  </li>
                  <li role="none">{logInButton}</li>
                </ul>
              )}
            </div>
            <div className="w-14">
              {!openMenu ? (
                <Button
                  onClick={() => setOpenMenu(true)}
                  text={
                    <img
                      src="src/assets/images/menu.svg"
                      alt="Open menu"
                      width="24"
                      height="24"
                    />
                  }
                  aria-expanded={openMenu}
                  aria-controls="mobile-menu"
                  aria-label="Open menu"
                />
              ) : (
                <Button
                  onClick={() => setOpenMenu(false)}
                  text={
                    <img
                      src="src/assets/images/x-solid.svg"
                      alt="Close menu"
                      width="24"
                      height="24"
                    />
                  }
                  aria-expanded={openMenu}
                  aria-controls="mobile-menu"
                  aria-label="Close menu"
                />
              )}
            </div>
          </>
        )}
        {windowSize === "m" && (
          <div>
            <ul className={styles.bigLinkWrapper} role="menubar">
              <li role="none">
                <NavLink to="/" className={styles.link} role="menuitem">
                  Hem
                </NavLink>
              </li>
              <li role="none">
                <NavLink
                  to="/booking"
                  className={styles.link}
                  role="menuitem"
                  onClick={resetBookingState}
                >
                  Sök resa
                </NavLink>
              </li>
              <li role="none">
                <NavLink to="/about" className={styles.link} role="menuitem">
                  Om oss
                </NavLink>
              </li>
              <li role="none">
                <NavLink to="/profile" className={styles.link} role="menuitem">
                  Din profil
                </NavLink>
              </li>
              <li role="none">{logInButton}</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
