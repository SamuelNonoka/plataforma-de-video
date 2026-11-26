import Header from './components/Header';
import MovieRow from './components/MovieRow';
import Banner from './components/Banner';
import { getFeaturedMovie, getMoviesByGenre } from './service/MovieService';

export default async function Home() {
  const featuredMovie = await getFeaturedMovie('101');
  const genres = ['Drama', 'Action', 'Comedy', 'Animation'];

  const movies = await Promise.all(
    genres.map(async (genre) => {
      const moviesOfGenre = await getMoviesByGenre(genre, { _limit: 8 });
      return { sectionTitle: genre, movies: moviesOfGenre };
    })
  );

  return (
    <div className='h-screenn relative overflow-hidden bg-linear-to-b from-transparent to-black/80 lg:h-[140vh]'>
      <Header />

      <main className='relative pb-24 pl-4 lg:pl-16'>
        <Banner movie={featuredMovie} />
        {movies.map((section) => (
          <MovieRow
            key={section.sectionTitle}
            sectionTitle={section.sectionTitle}
            movies={section.movies}
          />
        ))}
      </main>
    </div>
  );
}
