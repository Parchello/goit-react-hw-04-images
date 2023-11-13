import { Component } from 'react';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';
import { ModalWindow } from '../ModalWindow/ModalWindow';

export class GalleryImage extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    const { isModalOpen } = this.state;
    return (
      <div>
        <ImageGalleryItemImage
          src={webformatURL}
          alt={tags}
          load="lazy"
          onClick={this.toggleModal}
        />

        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={this.toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        ></ModalWindow>
      </div>
    );
  }
}
