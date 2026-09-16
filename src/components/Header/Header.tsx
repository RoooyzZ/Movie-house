import Logo from "../UI/Logo/Logo";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import styles from "./Header.module.css";
import Menu from "../Menu/Menu";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/router/routes";
import { useAppSelector } from "@/store/hooks";

function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brandNav}>
          <Logo />
          <Menu />
        </div>
        <div className={styles.headerActions}>
          <Link to={ROUTES.FAVORITES}>Избранное ({favoritesCount})</Link>
          <Search />
          <Profile />
        </div>
      </div>
    </header>
  );
}

export default Header;
