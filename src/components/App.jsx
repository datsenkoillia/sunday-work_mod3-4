import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from 'servises/movies-api';
import { MoviesList } from './MoviesList/MoviesList';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [isListShow, setIsListShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (isListShow) {
      setIsLoader(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevState => [...prevState, ...results]);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoader(false);
        });
    }

    if (!isListShow) {
      setMovies([]);
      setPage(1);
    }
  }, [isListShow, page]);

  const toggleVisibility = () => {
    setIsListShow(prev => !prev);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const deleteMovie = id => {
    setMovies(prevState => prevState.filter(el => el.id !== id));
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <Button
        clickHandler={toggleVisibility}
        text={isListShow ? 'hide movies list' : 'show movies list'}
      />
      {isListShow && (
        <>
          <MoviesList
            movies={movies}
            onDeleteMovie={deleteMovie}
            openModal={openModal}
          />
          <Button clickHandler={loadMore} text={'Load more'} />
        </>
      )}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
    </>
  );
};

// export class App extends Component {
//   state = { islistShow: false, movies: [], isLoader: false, page: 1 };

//   componentDidUpdate(_, prevState) {
//     const { isListShow, page } = this.state;
//     if (
//       (prevState.isListShow !== isListShow || prevState.page !== page) &&
//       isListShow
//     ) {
//       this.setState({ isLoader: true });
//       fetchMovies(page)
//         .then(({ data: { results } }) => {
//           this.setState(prevState => ({
//             movies: [...prevState.movies, ...results],
//           }));
//         })
//         .catch(error => console.log(error))
//         .finally(() => {
//           this.setState({ isLoader: false });
//         });
//     }

//     if (prevState.isListShow !== isListShow && !isListShow) {
//       this.setState({ movies: [], page: 1 });
//     }
//   }

//   toggleVisibility = () => {
//     this.setState(prevstate => ({ isListShow: !prevstate.isListShow }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { isListShow, movies } = this.state;
//     return (
//       <>
//         <Button
//           clickHandler={this.toggleVisibility}
//           text={isListShow ? 'hide movies list' : 'show movies list'}
//         />
//         {isListShow && (
//           <>
//             <MoviesList movies={movies} />
//             <Button clickHandler={this.loadMore} text={'Load more'} />
//           </>
//         )}
//       </>
//     );
//   }
// }
