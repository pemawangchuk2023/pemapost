'use client';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@components/Loader';
import PostCard from '@components/cards/PostCard';
import { useUser } from '@clerk/nextjs';

const SearchPost = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const getSearchPosts = async () => {
    const response = await fetch(`/api/post/search/${query}`);
    const data = await response.json();
    setSearchedPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchPosts();
  }, [query]);

  const { user, isLoaded } = useUser();

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-6'>
        <Link
          className='tab bg-purple-1'
          href={`/search/posts/${query}`}
        >
          Post
        </Link>
        <Link
          className='tab bg-purple-1'
          href={`/search/people/${query}`}
        >
          People
        </Link>
      </div>
      {searchedPosts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={getSearchPosts}
        />
      ))}
    </div>
  );
};

export default SearchPost;
