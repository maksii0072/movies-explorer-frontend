export function filterMovies(movies, query) {
  const moviesByQuery = !!movies ? movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  }): [];
  return moviesByQuery;
}

export function durationFilter(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

export function durationConverter(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}