"use client";
import { useEffect, useState } from "react";
import { getMockData } from "../lib/mockData";
import UserProfile from "./components/UserProfile";
import StoryCard from "./components/StoryCard";
import { motion } from "framer-motion";

// Types for story data and props
interface Story {
  id: string;
  status: string;
  rating: number;
  user_feedback: string;
}

interface Data {
  user: Record<string, any>;
  stories: Story[];
}

export default function Home() {
  const [data, setData] = useState<Data>({ user: {}, stories: [] });
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const dataFromStorage = getMockData();
    setData(dataFromStorage);
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRateStory = (storyId: string, newRating: number, newComment: string) => {
    const updatedStories = data.stories.map((story) =>
      story.id === storyId
        ? { ...story, rating: newRating, user_feedback: newComment }
        : story
    );
    setData({ ...data, stories: updatedStories });
  };

  const toggleDark = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const { user, stories } = data;
  const getStatusStories = (status: string) =>
    stories.filter((story) => story.status === status);

  const handleRemoveFavorite = (storyId: string) => {
    setData((prevData) => ({
      ...prevData,
      stories: prevData.stories.map((story) =>
        story.id === storyId ? { ...story, status: "" } : story
      ),
    }));
  };

  return (
    <motion.main
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-between">
        <UserProfile user={user} />
        <button onClick={toggleDark}>
          {darkMode ? (
            <span className="text-yellow-500 text-2xl">🌞</span>
          ) : (
            <span className="text-blue-500 text-2xl">🌙</span>
          )}
        </button>
      </div>
      <div className="space-y-8 mt-6">
        <StorySection
          title="Completed Stories"
          stories={getStatusStories("completed")}
          onRemoveFavourite={handleRemoveFavorite}
          handleRateStory={handleRateStory}
        />
        <StorySection
          title="In-Progress Stories"
          stories={getStatusStories("in-progress")}
          onRemoveFavourite={handleRemoveFavorite}
          handleRateStory={handleRateStory}
        />
        <StorySection
          title="Favorite Stories"
          stories={getStatusStories("favorite")}
          onRemoveFavourite={handleRemoveFavorite}
          handleRateStory={handleRateStory}
        />
      </div>
    </motion.main>
  );
}

interface StorySectionProps {
  title: string;
  stories: Story[];
  onRemoveFavourite?: (storyId: string) => void;
  handleRateStory?: (storyId: string, newRating: number, newComment: string) => void;
}

const StorySection = ({
  title,
  stories,
  onRemoveFavourite,
  handleRateStory,
}: StorySectionProps) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-bold mb-4 dark:text-white">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StoryCard
            story={story}
            onRemoveFavourite={onRemoveFavourite}
            onRateStory={handleRateStory}
          />
        </motion.div>
      ))}
    </div>
  </motion.section>
);
