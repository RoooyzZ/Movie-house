import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ROUTES } from "./shared/router/routes";
import ScrollToTop from "./shared/router/ScrollToTop";
import { lazy, Suspense } from "react";

const queryClient = new QueryClient();
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const MediaPage = lazy(() => import("@/pages/MediaPage/MediaPage"));
const FavoritesPage = lazy(() => import("@/pages/FavoritesPage/FavoritesPage"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.MEDIA_PAGE} element={<MediaPage />} />
              <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
