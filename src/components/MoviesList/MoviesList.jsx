export function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map(({ title, id }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}
