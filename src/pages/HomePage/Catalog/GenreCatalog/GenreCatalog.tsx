import styles from "./GenreCatalog.module.css";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "@/components/UI/MovieCard/MovieCard";
import { GenreSectionProps } from "@/hooks/useGenres/types";
import clsx from "clsx";
import AppButton from "@/components/UI/AppButton/AppButton";
import { ROUTES } from "@/shared/router/routes";

function GenreSection({ title, items, getGenreNames }: GenreSectionProps) {
  const navigate = useNavigate();

  const navigationId = `genre-nav-${title}`;

  if (!items || items.length === 0) return null;

  return (
    <div className={styles.boxGenre}>
      <h3>{title}</h3>
      <div className={styles.catalogBox}>
        <Swiper
          className={styles.catalogList}
          modules={[Navigation]}
          navigation={{
            nextEl: `.${navigationId}`,
          }}
          slidesPerView={4}
          loop={true}
          spaceBetween={20}
          centeredSlides={false}
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => item.id && item.type && navigate(ROUTES.mediaPage(item.type, item.id))}
            >
              <MovieCard
                id={item.id}
                title={item.title || item.name || ""}
                image={item.backdrop_path || ""}
                rating={item.vote_average || 0}
                genres={getGenreNames(item.genre_ids || [])}
                type={item.type ?? "movie"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <AppButton className={clsx(styles.buttonList, navigationId)}>⮞</AppButton>
      </div>
    </div>
  );
}

export default GenreSection;
