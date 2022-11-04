import ErrorComponent from 'components/ErrorComponent';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';
import { api } from 'services/api';
import { ERROR, WARNING } from 'utils/notification';

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ loading: true });

      try {
        const newImages = await api(nextQuery, nextPage);

        if (newImages.length === 0) {
          throw new Error(ERROR.NOT_FOUND);
        }

        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          error: null,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = async newQuery => {
    if (newQuery === '') {
      this.setState({ error: ERROR.EMPTY_SEARCH, images: [] });
      return;
    }
    this.setState({ images: [], query: newQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { query, images, error, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {!query ? (
          <ErrorComponent title={WARNING.NOTHING_YET} text={error} />
        ) : (
          <ImageGallery
            images={images}
            onLoadMore={this.onLoadMore}
            error={error}
            loading={loading}
          />
        )}

        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;

// перед первым запросом - вывод строки "пусто"
// первый запрос "коты"
// запуск лоадера
// удачный - рендер галереи
// не удачный - рендер ошибки
// первый рендер  - 12 картинок
//  остановка лоадера
// в момент работы лоадера кнопка "загрузить ещё" не доступна
// нажатие на кнопку "загрузить ещё"
// рендер +12 картинок по тому же запросу1
// второй запрос "собаки"
// очищение стейта картинок
// фетч 12 картинок по второму запросу
// новый рендер

//Если загрузили последнюю порцию запросов - скрыть кнопку "загрузить ещё"
