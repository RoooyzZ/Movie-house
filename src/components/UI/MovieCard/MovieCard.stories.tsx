import type { Meta, StoryObj } from "@storybook/react";
import MovieCard from "./MovieCard";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const meta: Meta<typeof MovieCard> = {
  title: "Components/MovieCard",
  component: MovieCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    id: 42,
    title: "Гарри Поттер",
    image: "/poster.jpg",
    rating: 8.7,
    type: "movie",
    genres: "Фэнтези",
  },
};
