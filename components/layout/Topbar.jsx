'use client';
import { SignedIn, UserButton, SignOutButton } from '@clerk/nextjs';
import { Add, Logout, Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Topbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearchChange = () => {};
  return (
    <div className='flex justify-between items-center mt-6'>
      <div className='relative'>
        <input
          type='text'
          className='search-bar'
          placeholder='Search posts, people, ...'
          value={search}
          onChange={handleSearchChange}
        />
        <Search
          className='search-icon'
          onClick={() => {}}
        />
      </div>
      <button
        className='create-post-btn'
        onClick={() => router.push('/create-post')}
      >
        <Add />
        <p>Create a Post</p>
      </button>
      <div className='flex gap-3'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer gap-4 items-center md:hidden'>
              <Logout sx={{ color: 'white', fontSize: '32px' }} />
              <p className='text-body-bold text-light-1'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
      <Link href='/'>
        <Image
          src='/assets/pema.png'
          alt='profile photo'
          width={50}
          height={50}
          className='rounded-full md-hidden'
        />
      </Link>
    </div>
  );
};

export default Topbar;
