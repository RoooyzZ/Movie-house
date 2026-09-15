import AppButton from "@/components/UI/AppButton/AppButton";
import type { MovieDetails } from "@/pages/MediaPage/types/types";
import { getMediaTitle, isMovie } from "@/shared/utils/media";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import styles from "./MovieActions.module.css";

function MovieActions({ data }: { data: MovieDetails }) {
  const dispatch = useAppDispatch();
  const id = data.id;
  const type = isMovie(data) ? "movie" : "tv";
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === id && item.type === type),
  );

  function handleToggleFavorite() {
    if (id === undefined) return;

    if (isFavorite) {
      dispatch(removeFavorite({ id, type }));
    } else {
      dispatch(
        addFavorite({
          id,
          type,
          title: getMediaTitle(data),
          image: data.poster_path ?? "",
        }),
      );
    }
  }

  return (
    <div className={styles.containerButton}>
      <AppButton className={styles.buttonWatch}>Смотреть фильм</AppButton>
      <AppButton>Трейлер</AppButton>
      <AppButton>
        <img src="/images/download.svg" alt="скачать" />
      </AppButton>
      <AppButton
        type="button"
        disabled={id === undefined}
        onClick={handleToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
        title={isFavorite ? "Убрать из избранного" : "В избранное"}
        className={isFavorite ? styles.favoriteActive : undefined}
      >
        <img src="/images/favourites.svg" alt="" />
      </AppButton>
    </div>
  );
}

export default MovieActions;
