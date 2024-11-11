"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";

export interface Story {
  id: string;
  image: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  user_feedback?: string;
  status: "favorite" | "completed" | "in-progress" | "";
  completion_date?: string;
  progress?: number;
  description?: string;
}

interface StoryCardProps {
  story: Story;
  onRemoveFavourite: (id: string) => void;
  onRateStory?: (id: string, rating: number, comment: string) => void;
}

export default function StoryCard({
  story,
  onRemoveFavourite,
  onRateStory,
}: StoryCardProps) {
  const [rating, setRating] = useState(story.rating || 0);
  const [comment, setComment] = useState(story.user_feedback || "");
  const router = useRouter();

  const handleNavigate = () => {
    if (story.status === "favorite") {
      router.push(`/stories/${story.id}`);
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRateStory?.(story.id, newRating, comment);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    onRateStory?.(story.id, rating, newComment);
  };

  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <LazyLoad>
        <motion.img
          src={story.image}
          alt={story.title}
          className="w-full h-40 object-cover rounded-md mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </LazyLoad>

      <h3 className="text-lg font-semibold">{story.title}</h3>
      <p className="text-sm text-gray-600">By {story.author}</p>
      <p className="text-sm">Category: {story.category}</p>

      <div className="flex items-center mt-2">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <motion.span
              key={index}
              className={`cursor-pointer text-xl ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(index + 1)}
              whileTap={{ scale: 1.3 }}
            >
              ★
            </motion.span>
          ))}
      </div>

      <div className="mt-2">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:border-blue-400"
        />
      </div>

      {story.status === "completed" && (
        <motion.p
          className="text-green-500 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Completed on {story.completion_date}
        </motion.p>
      )}

      {story.status === "in-progress" && (
        <div className="mt-2">
          <p className="text-blue-500 text-sm">Progress: {story.progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${story.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {story.status === "favorite" && (
        <motion.p
          className="text-yellow-500 text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Marked as Favorite
        </motion.p>
      )}

      {story.user_feedback && (
        <motion.p
          className="italic text-sm text-primary mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          &quot;{story.user_feedback}&quot;
        </motion.p>
      )}

      {story.status === "favorite" && (
        <div
          className="absolute top-4 right-4"
        >
          <motion.button
            className="bg-white p-1 rounded-full shadow-md"
            onClick={() => onRemoveFavourite(story.id)}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >
            ❤️
          </motion.button>
        </div>
      )}

      {(story.status === "favorite"  || story.status === "in-progress")&& (
        <button
          onClick={() => {
            handleNavigate();
          }}
          className="relative left-1/3 mt-2  inline-flex items-center px-8 ml-2 py-3 overflow-hidden text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-500 transform translate-x-full bg-white opacity-10 rotate-12 group-hover:-translate-x-8"></span>
          <span className="relative font-medium">{story.status === "in-progress"?"Continue":"Go to story"}</span>
        </button>
      )}
    </motion.div>
  );
}
