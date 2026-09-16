import MovieActions from "./MovieActions/MovieActions";
import MovieMeta from "./MovieMeta/MovieMeta";
import styles from "./MovieInfo.module.css";
import { MovieInfoProps } from "./types";
import { isMovie } from "@/shared/utils/media";

function MovieInfo({ data }: MovieInfoProps) {
  return (
    <div className={styles.containerInfo}>
      <h1 className={styles.titleMain}>{isMovie(data) ? data.original_title : data.name}</h1>
      <MovieMeta data={data} />
      <MovieActions data={data} />
    </div>
  );
}

export default MovieInfo;
