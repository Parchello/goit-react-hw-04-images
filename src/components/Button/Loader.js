import { Container, LoadButton } from './Loader.styled';

export const Loader = ({ addPage }) => {
  return (
    <Container>
      <LoadButton onClick={addPage}>Load more</LoadButton>
    </Container>
  );
};
