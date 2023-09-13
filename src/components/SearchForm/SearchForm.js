import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <>
    <section className="search">
      <form className="search__form" id="form">
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          required>
        </input>
        <button className="search__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox />
      <span className="search__form-border"></span>
    </section>
    </>
  );
}

export default SearchForm;