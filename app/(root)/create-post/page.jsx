'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Posting from '@components/forms/Posting';
import Loader from '@components/Loader';

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const postData = {
    creatorId: userData?._id,
    caption: '',
    tag: '',
    postPhoto: null,
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className='pt-6'>
      <Posting
        post={postData}
        apiEndpoint={'/api/post/new'}
      />
    </div>
  );
};

export default CreatePost;
