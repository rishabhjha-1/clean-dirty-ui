// app/page.js
"use client";
import { useEffect, useState } from 'react';
import { getMockData } from '../lib/mockData';
import UserProfile from './components/UserProfile';
import StoryCard from './components/StoryCard';

export default function Home() {
  const [data, setData] = useState({ user: {}, stories: [] });

  useEffect(() => {
    const dataFromStorage = getMockData();
    setData(dataFromStorage);
  }, []);
  const handleRateStory = (storyId: any, newRating: any, newComment: any) => {
    const updatedStories = stories.map((story:any) =>
      story.id === storyId
        ? { ...story, rating: newRating, user_feedback: newComment }
        : story
    );
    setData({ ...data, stories: updatedStories as any });
  };

  const { user, stories } = data;
  const getStatusStories = (status:any) => stories.filter((story:any) => story.status === status);
  const handleRemoveFavorite = (storyId:any) => {
    setData((prevData:any) => ({
      ...prevData,
      stories: prevData.stories.map((story:any) =>
        story.id === storyId ? { ...story, status: '' } : story
      ),
    }));
  };
  return (
    <main className="max-w-4xl mx-auto p-8">
      <UserProfile user={user} />
      <div className="space-y-8 mt-6">
        <StorySection title="Completed Stories" stories={getStatusStories("completed")} onRemoveFavourite={handleRemoveFavorite} handleRateStory={handleRateStory}/>
        <StorySection title="In-Progress Stories" stories={getStatusStories("in-progress")} onRemoveFavourite={handleRemoveFavorite} handleRateStory={handleRateStory}/>
        <StorySection title="Favorite Stories" stories={getStatusStories("favorite")} onRemoveFavourite={handleRemoveFavorite} handleRateStory={handleRateStory}/>
      </div>
    </main>
  );
}

const StorySection = ({ title, stories,onRemoveFavourite,handleRateStory }:{title:any,stories:any,onRemoveFavourite?:any,handleRateStory?:any}) => (
  <section>
    <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story:any) => (
        <StoryCard key={story.id} story={story} onRemoveFavourite={onRemoveFavourite} onRateStory={handleRateStory
        }/>
      ))}
    </div>
  </section>
);
