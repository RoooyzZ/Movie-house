export const ROUTES = {
  HOME: "/",
  MEDIA_PAGE: "/media/:type/:id",
  FAVORITES: "/favorites",
  mediaPage: (type: "movie" | "tv", id: number | string) => `/media/${type}/${id}`,
} as const;
