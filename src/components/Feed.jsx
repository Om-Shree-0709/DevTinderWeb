import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching feed:", error);
        setError("Failed to load feed.");
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-2 p-2 border-b border-gray-300">
            <p className="font-medium">
              {post.firstName} {post.lastName}
            </p>
            <p className="text-sm text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
