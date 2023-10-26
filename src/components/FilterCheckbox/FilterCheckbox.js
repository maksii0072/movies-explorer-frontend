import './FilterCheckbox.css';

function FilterCheckbox({ isFilter, setFilter }) {

  return (
    <form className='filterCheckbox'>
        <input
          type='checkbox'
          checked={isFilter}
          className='filterCheckbox__input'
          placeholder=''
          onChange={(event) => setFilter(event.target.checked)}
        />
        <span className='filterCheckbox__span'>      Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;