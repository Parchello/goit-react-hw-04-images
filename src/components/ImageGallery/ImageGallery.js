import { Wrapper, ImageGalleryItemLi } from './ImageGallery.styled';
import { GalleryImage } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesRender }) => {
  return (
    <div>
      <Wrapper>
        {imagesRender.map(item => (
          <ImageGalleryItemLi key={item.id}>
            <GalleryImage item={item} />
          </ImageGalleryItemLi>
        ))}
      </Wrapper>
    </div>
  );
};
