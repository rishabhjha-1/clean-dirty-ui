"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

// components/StoryCard.js
export default function StoryCard({ story,onRemoveFavourite,onRateStory }:{story:any,onRemoveFavourite:any,onRateStory?:any}) {
    const [rating, setRating] = useState(story.rating || 0);
    const [comment, setComment] = useState(story.user_feedback || '');
    const router = useRouter();
  
    // Navigate to the story’s full page
    const handleNavigate = () => {
        if(story.status === 'favorite'){
            router.push(`/stories/${story.id}`);

        }
    };
  
    // Handle rating change
    const handleRatingChange = (newRating: number) => {
      setRating(newRating);
      onRateStory(story.id, newRating, comment);
    };
  
    // Handle comment change
    const handleCommentChange = (e:any) => {
      setComment(e.target.value);
      onRateStory(story.id, rating, e.target.value);
    };
  
    return (
      <div onClick={handleNavigate} className="bg-white  shadow-lg rounded-lg p-4 mb-4">
        <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded-md mb-4" />
        <h3 className="text-lg  font-semibold">{story.title}</h3>
        <p className="text-sm text-secondary">By {story.author}</p>
        <p className="text-sm">Category: {story.category}</p>
        <p className="text-sm">Rating: {story.rating} / 5</p>
        <div className="flex items-center">
          {Array(5).fill(0).map((_, index) => (
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
          <p className="italic text-sm text-primary mt-2">"{story.user_feedback}"</p>
        )}
        {story.status === 'favorite' &&<button
        className=" top-4 right-4 bg-white p-1 rounded-full shadow-md"
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation on remove click
          onRemoveFavourite(story.id);
        }}
      >
        {story.status === 'favorite' ? '❤️' : '🤍'}
      </button>}
      </div>
    );
  }
  