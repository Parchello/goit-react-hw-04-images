import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Button/Loader';
import { fetchImages } from './api';
import { MagnifyingGlass } from 'react-loader-spinner';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const onSearch = async newQuery => {
    if (newQuery === '') {
      toast.error('Please enter something to search');
    } else {
      setIsLoading(true);
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  useEffect(() => {
    if (query === '') return;
    const fetchUpdatedImages = async () => {
      try {
        setIsLoading(true);
        const searchedImages = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...searchedImages.hits]);
        setShowBtn(page < Math.ceil(searchedImages.totalHits / 12));
        setIsLoading(false);
      } catch (error) {
        toast.error('There is an error fetching images');
        setIsLoading(false);
      }
    };

    fetchUpdatedImages();
  }, [query, page]);

  const onAdd = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar addGalery={onSearch} />
      {isLoading && (
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
      <ImageGallery imagesRender={images} />
      {showBtn && <Loader addPage={onAdd} />}
      <Toaster />
    </div>
  );
};
