// lib/mockData.js
export const getMockData = () => {
    const initialData = {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        profile_picture: "https://picsum.photos/200/200?random=1",
      },
      stories: [
        {
          id: 1,
          title: "The Desire Within",
          author: "Jane Smith",
          image: "https://picsum.photos/300/400?random=2",
          category: "Erotic",
          rating: 4,
          status: "completed",
          progress: 100,
          completion_date: "2024-10-15",
          user_feedback: "Loved the storyline, very engaging!",
        },
        {
          id: 2,
          title: "Exploring Intimacy",
          author: "David Brown",
          image: "https://picsum.photos/300/400?random=3",
          category: "Intimate",
          rating: 5,
          status: "in-progress",
          progress: 45,
          completion_date: null,
          user_feedback: null,
        },
        {
          id: 3,
          title: "A Journey of Desire",
          author: "Alice Green",
          image: "https://picsum.photos/300/400?random=4",
          category: "Erotic",
          rating: 3,
          status: "favorite",
          progress: 0,
          completion_date: null,
          user_feedback: null,
        },
        {
          id: 4,
          title: "Mysteries of Love",
          author: "Mark Wilson",
          image: "https://picsum.photos/300/400?random=5",
          category: "Intimate",
          rating: 4,
          status: "completed",
          progress: 100,
          completion_date: "2024-09-28",
          user_feedback: "A good read, very thought-provoking.",
        },
        {
          id: 5,
          title: "Sensuality and Secrets",
          author: "Maria Johnson",
          image: "https://picsum.photos/300/400?random=6",
          category: "Erotic",
          rating: 2,
          status: "in-progress",
          progress: 20,
          completion_date: null,
          user_feedback: null,
        },
        {
          id: 6,
          title: "Whispers in the Night",
          author: "Chris Adams",
          image: "https://picsum.photos/300/400?random=7",
          category: "Erotic",
          rating: 4,
          status: "favorite",
          progress: 0,
          completion_date: null,
          user_feedback: null,
        },
        {
          id: 7,
          title: "Unspoken Words",
          author: "Ella Martinez",
          image: "https://picsum.photos/300/400?random=8",
          category: "Intimate",
          rating: 5,
          status: "completed",
          progress: 100,
          completion_date: "2024-08-25",
          user_feedback: "A deep emotional connection, beautifully written.",
        },
        {
          id: 8,
          title: "The Forbidden Garden",
          author: "Olivia White",
          image: "https://picsum.photos/300/400?random=9",
          category: "Erotic",
          rating: 3,
          status: "in-progress",
          progress: 60,
          completion_date: null,
          user_feedback: null,
        },
        {
          id: 9,
          title: "Falling for You",
          author: "Liam Black",
          image: "https://picsum.photos/300/400?random=10",
          category: "Intimate",
          rating: 4,
          status: "completed",
          progress: 100,
          completion_date: "2024-07-12",
          user_feedback: "A beautifully crafted story that touched my heart.",
        },
        {
          id: 10,
          title: "Love Unbound",
          author: "Sophia Lee",
          image: "https://picsum.photos/300/400?random=11",
          category: "Erotic",
          rating: 5,
          status: "favorite",
          progress: 0,
          completion_date: null,
          user_feedback: null,
        },
      ],
    };
  
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("storyAppData");
      if (!storedData) {
        localStorage.setItem("storyAppData", JSON.stringify(initialData));
      }
      return JSON.parse(
        localStorage.getItem("storyAppData") || JSON.stringify(initialData)
      );
    }
  
    return initialData;
  };
  