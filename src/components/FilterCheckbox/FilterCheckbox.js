import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onFilter}) {

  function handleCheckboxChange(e) {
    const isChecked = e.target.checked;
    onFilter(isChecked);

    localStorage.setItem('isShortMovies', isChecked);
     }

  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={localStorage.getItem('isShortMovies') === 'true'}>
      </input>
      <span className="filter__text">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;