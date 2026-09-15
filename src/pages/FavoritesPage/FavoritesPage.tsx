import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFavorite } from "@/store/favoritesSlice";
import { ROUTES } from "@/shared/router/routes";
import { getPosterUrl } from "@/shared/utils/media";
import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
  const items = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h1>Избранное</h1>
        <span className={styles.count}>{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <h2>Здесь будут ваши любимые фильмы и сериалы</h2>
          <p>Нажмите на сердечко на странице фильма или сериала, чтобы сохранить его здесь.</p>
          <Link className={styles.catalogLink} to={ROUTES.HOME}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <ul className={styles.grid}>
          {items.map((item) => (
            <li className={styles.card} key={`${item.type}-${item.id}`}>
              <Link className={styles.cardLink} to={ROUTES.mediaPage(item.type, item.id)}>
                <img
                  className={styles.poster}
                  src={getPosterUrl(item.image)}
                  alt=""
                  loading="lazy"
                  width={300}
                  height={450}
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith("/images/zagluchka.jpg")) {
                      event.currentTarget.src = "/images/zagluchka.jpg";
                    }
                  }}
                />
                <div className={styles.info}>
                  <span className={styles.mediaType}>
                    {item.type === "movie" ? "Фильм" : "Сериал"}
                  </span>
                  <h2 className={styles.title}>{item.title}</h2>
                </div>
              </Link>

              <button
                className={styles.removeButton}
                type="button"
                aria-label={`Убрать «${item.title}» из избранного`}
                onClick={() =>
                  dispatch(
                    removeFavorite({
                      id: item.id,
                      type: item.type,
                    }),
                  )
                }
              >
                Убрать из избранного
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FavoritesPage;
