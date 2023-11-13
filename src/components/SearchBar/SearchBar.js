import { Formik, Field, Form } from 'formik';
import { SearcWrapper } from './SearchBar.styled';
export const SearchBar = ({ addGalery }) => {
  return (
    <SearcWrapper>
      <Formik
        initialValues={{
          queryName: '',
        }}
        onSubmit={async values => {
          await addGalery(values.queryName);
        }}
      >
        <Form>
          <label htmlFor="queryName"></label>
          <Field id="queryName" name="queryName" placeholder="Search" />

          <button type="submit">Search</button>
        </Form>
      </Formik>
    </SearcWrapper>
  );
};
