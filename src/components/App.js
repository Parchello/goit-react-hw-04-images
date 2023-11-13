import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Button/Loader';
import { fetchImages } from './api';
import { MagnifyingGlass } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    page: 1,
    showBtn: false,
  };

  onSearch = async newQuery => {
    if (newQuery === '') {
      toast.error('Please enter something to search');
    } else {
      this.setState({
        isLoading: true,
        query: newQuery,
        page: 1,
        images: [],
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchUpdatedImages();
    }
  }

  fetchUpdatedImages = async () => {
    const { page, query } = this.state;

    try {
      this.setState({ isLoading: true });
      const searchedImages = await fetchImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...searchedImages.hits],
        showBtn: this.state.page < Math.ceil(searchedImages.totalHits / 12),
        isLoading: false,
      }));
    } catch (error) {
      toast.error('There is an error fetching images');
      this.setState({ isLoading: false });
    }
  };

  onAdd = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <div>
        <SearchBar addGalery={this.onSearch} />
        {this.state.isLoading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        <ImageGallery imagesRender={this.state.images} />
        {this.state.showBtn && <Loader addPage={this.onAdd} />}
        <Toaster />
      </div>
    );
  }
}
