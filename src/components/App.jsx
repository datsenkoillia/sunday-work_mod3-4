import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'servises/movies-api';
import { MoviesList } from './MoviesList/MoviesList';

export class App extends Component {
  state = { islistShow: false, movies: [], isLoader: false, page: 1 };

  componentDidUpdate(_, prevState) {
    const { isListShow, page } = this.state;
    if (
      (prevState.isListShow !== isListShow || prevState.page !== page) &&
      isListShow
    ) {
      this.setState({ isLoader: true });
      fetchMovies(page)
        .then(({ data: { results } }) => {
          this.setState(prevState => ({
            movies: [...prevState.movies, ...results],
          }));
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoader: false });
        });
    }

    if (prevState.isListShow !== isListShow && !isListShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  toggleVisibility = () => {
    this.setState(prevstate => ({ isListShow: !prevstate.isListShow }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isListShow, movies } = this.state;
    return (
      <>
        <Button
          clickHandler={this.toggleVisibility}
          text={isListShow ? 'hide movies list' : 'show movies list'}
        />
        {isListShow && (
          <>
            <MoviesList movies={movies} />
            <Button clickHandler={this.loadMore} text={'Load more'} />
          </>
        )}
      </>
    );
  }
}
