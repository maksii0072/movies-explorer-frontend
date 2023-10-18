import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onFilter, isShortMovies }) {
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    onFilter(isChecked);
  }

  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={isShortMovies}
      />
      <span className="filter__text">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;
