import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import favoritesReducer, { addFavorite } from "@/store/favoritesSlice";
import MovieCard from "@/components/UI/MovieCard/MovieCard";
import MovieActions from "@/pages/MediaPage/MediaHero/MovieInfo/MovieActions/MovieActions";
import FavoritesPage from "./FavoritesPage";

function makeStore() {
  return configureStore({ reducer: { favorites: favoritesReducer } });
}

describe("Избранное: пользовательские действия", () => {
  it("показывает пустое состояние и ссылку в каталог", () => {
    render(
      <Provider store={makeStore()}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Здесь будут ваши любимые фильмы и сериалы")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Перейти в каталог" })).toHaveAttribute("href", "/");
  });

  it.each(["movie", "tv"] as const)(
    "синхронизирует сердечки каталога, страницы %s и список избранного",
    async (type) => {
      const user = userEvent.setup();
      const store = makeStore();
      const navigate = vi.fn();
      const data =
        type === "movie"
          ? { id: 42, original_title: "Original", title: "Название", poster_path: "/poster.jpg" }
          : { id: 42, name: "Название", poster_path: "/poster.jpg" };
      render(
        <Provider store={store}>
          <MemoryRouter>
            <div onClick={navigate}>
              <MovieCard
                id={42}
                title="Название"
                type={type}
                image="/poster.jpg"
                rating={8}
                genres="Драма"
              />
            </div>
            <MovieActions data={data} />
            <FavoritesPage />
          </MemoryRouter>
        </Provider>,
      );

      const cardHeart = screen.getByRole("button", { name: "В избранное: Название" });
      const detailHeart = screen.getByRole("button", { name: "В избранное" });
      await user.click(cardHeart);
      expect(navigate).not.toHaveBeenCalled();
      expect(cardHeart).toHaveAttribute("aria-pressed", "true");
      expect(detailHeart).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("link", { name: /Название$/ })).toHaveAttribute(
        "href",
        `/media/${type}/42`,
      );

      await user.click(detailHeart);
      expect(cardHeart).toHaveAttribute("aria-pressed", "false");
      expect(screen.queryByRole("list")).not.toBeInTheDocument();

      await user.click(detailHeart);
      const list = screen.getByRole("list");
      expect(within(list).getByRole("presentation")).toHaveAttribute(
        "src",
        expect.stringContaining("/poster.jpg"),
      );
      await user.click(
        within(list).getByRole("button", { name: "Убрать «Название» из избранного" }),
      );
      expect(detailHeart).toHaveAttribute("aria-pressed", "false");
      expect(store.getState().favorites.items).toEqual([]);
    },
  );

  it("блокирует добавление без id", () => {
    render(
      <Provider store={makeStore()}>
        <MovieCard id={undefined} title="Без id" type="movie" image="" rating={0} genres="" />
        <MovieActions data={{ name: "Без id" }} />
      </Provider>,
    );
    expect(screen.getByRole("button", { name: "В избранное: Без id" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "В избранное" })).toBeDisabled();
  });

  it("заменяет недоступный постер заглушкой", () => {
    const store = makeStore();
    store.dispatch(addFavorite({ id: 1, type: "movie", title: "Фильм", image: "/missing.jpg" }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>,
    );
    const poster = screen.getByRole("presentation");
    fireEvent.error(poster);
    expect(poster).toHaveAttribute("src", "/images/zagluchka.jpg");
    fireEvent.error(poster);
    expect(poster).toHaveAttribute("src", "/images/zagluchka.jpg");
  });
});
