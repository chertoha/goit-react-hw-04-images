import { AiOutlineSearch } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';

const Searchbar = ({ onSubmit }) => {
  const onSubmitHandle = (values, actions) => {
    onSubmit(values.query.trim());
    actions.resetForm();
  };

  return (
    <header className="searchbar Searchbar">
      <Formik initialValues={{ query: '' }} onSubmit={onSubmitHandle}>
        <Form className="form SearchForm ">
          <button
            type="submit"
            className="button SearchForm-button"
            // disabled={isSubmitting}
          >
            <span className="button-label SearchForm-button-label">
              <AiOutlineSearch />
            </span>
          </button>

          <Field
            name="query"
            className="input SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default Searchbar;

///Prop types~!!!!!!!!!!!
