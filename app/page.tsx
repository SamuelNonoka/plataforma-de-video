import { Suspense } from 'react';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import Banner from './components/Banner';
import { getFeaturedMovie, getMoviesByGenre } from './service/MovieService';

const genres = ['Drama', 'Action', 'Comedy', 'Animation'];

async function FeaturedBanner() {
  const featuredMovie = await getFeaturedMovie('101');
  return <Banner movie={featuredMovie} />;
}

async function MovieSections() {
  const movies = await Promise.all(
    genres.map(async (genre) => {
      const moviesOfGenre = await getMoviesByGenre(genre, { _limit: 8 });
      return { sectionTitle: genre, movies: moviesOfGenre };
    })
  );

  return movies.map((section) => (
    <MovieRow
      key={section.sectionTitle}
      sectionTitle={section.sectionTitle}
      movies={section.movies}
    />
  ));
}

export default function Home() {
  return (
    <div className='relative h-screen overflow-hidden bg-linear-to-b from-transparent to-black/80 lg:h-[140vh]'>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className='relative pb-24 pl-4 lg:pl-16'>
        <Suspense fallback={<div className='mb-10 h-[65vh]' />}>
          <FeaturedBanner />
        </Suspense>
        <Suspense
          fallback={<p className='text-lg text-white/70'>Loading...</p>}
        >
          <MovieSections />
        </Suspense>
      </main>
    </div>
  );
}
