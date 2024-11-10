"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import LazyLoad from 'react-lazyload';

export interface Story {
//   stories: any;
  id: string;
  image: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  user_feedback?: string;
  status: 'favorite' | 'completed' | 'in-progress' | '';
  completion_date?: string;
  progress?: number;
  description?:string
}

interface StoryCardProps {
  story: Story;
  onRemoveFavourite: (id: string) => void;
  onRateStory?: (id: string, rating: number, comment: string) => void;
}

// components/StoryCard.tsx
export default function StoryCard({ story, onRemoveFavourite, onRateStory }: StoryCardProps) {
  const [rating, setRating] = useState(story.rating || 0);
  const [comment, setComment] = useState(story.user_feedback || '');
  const router = useRouter();

  const handleNavigate = () => {
    if (story.status === 'favorite') {
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
    <div onClick={handleNavigate} className="bg-white shadow-lg rounded-lg p-4 mb-4">
        <LazyLoad >
          <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded-md mb-4" />
      </LazyLoad>
      
      <h3 className="text-lg font-semibold">{story.title}</h3>
      <p className="text-sm text-secondary">By {story.author}</p>
      <p className="text-sm">Category: {story.category}</p>
      <p className="text-sm">Rating: {story.rating} / 5</p>
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => handleRatingChange(index + 1)}
            >
              ★
            </span>
          ))}
      </div>

      <div className="mt-2">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
          className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
        />
      </div>
      {story.status === 'completed' && (
        <p className="text-green-500 text-sm mt-2">Completed on {story.completion_date}</p>
      )}
      {story.status === 'in-progress' && (
        <p className="text-blue-500 text-sm mt-2">Progress: {story.progress}%</p>
      )}
      {story.status === 'favorite' && (
        <p className="text-yellow-500 text-sm mt-2">Marked as Favorite</p>
      )}
      {story.user_feedback && (
        <p className="italic text-sm text-primary mt-2">&quot;{story.user_feedback}&quot;</p>
      )}
      {story.status === 'favorite' && (
        <button
          className="top-4 right-4 bg-white p-1 rounded-full shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFavourite(story.id);
          }}
        >
          ❤️
        </button>
      )}
    </div>
  );
}
