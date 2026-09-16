import { describe, expect, it } from "vitest";
import reducer, { addFavorite, removeFavorite } from "./favoritesSlice";

const movie = { id: 42, type: "movie" as const, title: "Фильм", image: "/poster.jpg" };
const series = { ...movie, type: "tv" as const, title: "Сериал" };

describe("Избранное: reducer", () => {
  it("начинает с пустого списка", () => {
    expect(reducer(undefined, { type: "init" })).toEqual({ items: [] });
  });

  it("добавляет запись, не изменяя предыдущее состояние", () => {
    const previous = { items: [] };
    expect(reducer(previous, addFavorite(movie)).items).toEqual([movie]);
    expect(previous.items).toEqual([]);
  });

  it("не добавляет дубликат", () => {
    const state = reducer(undefined, addFavorite(movie));
    expect(reducer(state, addFavorite(movie)).items).toEqual([movie]);
  });

  it("различает фильм и сериал с одинаковым id при добавлении и удалении", () => {
    const state = reducer(reducer(undefined, addFavorite(movie)), addFavorite(series));
    expect(state.items).toEqual([movie, series]);
    const next = reducer(state, removeFavorite({ id: 42, type: "movie" }));
    expect(next.items).toEqual([series]);
    expect(state.items).toEqual([movie, series]);
  });

  it("сохраняет список при удалении отсутствующей записи", () => {
    const state = reducer(undefined, addFavorite(movie));
    expect(reducer(state, removeFavorite({ id: 99, type: "movie" })).items).toEqual([movie]);
  });
});
