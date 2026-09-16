import styles from "./MovieCard.module.css";
import { getPosterUrl } from "@/shared/utils/media";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";

interface MovieCardProps {
  id: number | undefined;
  title: string;
  image: string;
  rating: number;
  type: "movie" | "tv";
  genres: string;
}

function MovieCard({ id, title, image, rating, type, genres }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === id && item.type === type),
  );

  function handleToggleFavorite() {
    if (id === undefined) return;

    if (isFavorite) {
      dispatch(removeFavorite({ id, type }));
    } else {
      dispatch(addFavorite({ id, type, title, image }));
    }
  }

  return (
    <div className={styles.card}>
      <img className={styles.imgCatalog} src={getPosterUrl(image)} alt={title} />
      <button
        className={styles.favoriteButton}
        type="button"
        disabled={id === undefined}
        aria-pressed={isFavorite}
        aria-label={`${isFavorite ? "Убрать из избранного" : "В избранное"}: ${title}`}
        title={isFavorite ? "Убрать из избранного" : "В избранное"}
        onClick={(event) => {
          event.stopPropagation();
          handleToggleFavorite();
        }}
      >
        <span className={styles.heart} aria-hidden="true" />
      </button>
      <div className={styles.catalogContent}>
        <span> {rating.toFixed(1)}</span>
        <span>{type === "movie" ? "Фильм" : "Сериал"}</span>
        <span>{genres}</span>
      </div>
      <h4>{title}</h4>
    </div>
  );
}

export default MovieCard;
