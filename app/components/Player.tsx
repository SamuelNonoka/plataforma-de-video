'use client';

import Link from 'next/link';
import { Movie } from '@/app/types/movie';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import '@videojs/react/video/skin.css';
import {
  Video,
  VideoPlayer,
  VideoSkin,
  usePlayer,
} from '@videojs/react/video';

type Props = {
  movie: Movie;
};

function Overlay({ movie }: Props) {
  const paused = usePlayer((state) => state.paused);
  const visibility = paused ? 'opacity-100' : 'pointer-events-none opacity-0';

  return (
    <>
      <Link
        href='/'
        className={`invisible absolute top-8 left-8 z-50 transition-opacity duration-500 md:visible ${visibility}`}
      >
        <ArrowLeftIcon className='h-8 cursor-pointer text-white' />
      </Link>

      {/* mobile title  */}
      <div
        className={`visible absolute top-8 left-2 z-50 transition-opacity duration-500 md:invisible ${visibility}`}
      >
        <div className='flex flex-row items-center gap-4'>
          <Link href='/'>
            <ArrowLeftIcon className='h-6' />
          </Link>
          <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
            {movie.title}
          </h1>
        </div>
      </div>

      <div
        className={`invisible absolute top-96 left-8 z-50 transition-opacity duration-500 md:visible ${visibility}`}
      >
        <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>
          {movie.title}
        </h1>
        <p className='mt-4 max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl'>
          {movie.description}
        </p>
      </div>
    </>
  );
}

export default function Player({ movie }: Props) {
  return (
    <div className='flex h-screen items-center justify-center'>
      <VideoPlayer title={movie.title}>
        <VideoSkin
          className='relative w-full rounded-md bg-black'
          style={{ aspectRatio: '16 / 9' }}
        >
          <Video src={movie.videoFileURL} playsInline />
          <Overlay movie={movie} />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
