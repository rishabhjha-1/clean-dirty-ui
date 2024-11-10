"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMockData } from "@/lib/mockData";
import { motion } from "framer-motion";

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const router=useRouter()

  useEffect(() => {
    if (id) {
      const dataFromStorage = getMockData();
      const storyData = dataFromStorage.stories.find((story: any) => story.id == id);
      setStory(storyData);
    }
  }, [id]);

  if (!story) return <div>Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{story.title}</h1>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">{story.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Status: {story.status}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {story.rating}</p>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white">User Feedback:</h3>
          <p className="text-gray-700 dark:text-gray-300">{story.user_feedback}</p>
        </div>
        
      </motion.div>
      <motion.button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")} // Navigate to homepage
        >
          Go Back to Homepage
        </motion.button>
    </motion.div>
  );
};

export default StoryDetailPage;
