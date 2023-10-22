import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <label className="filtercheckbox">
      <input className="filtercheckbox__input" type="checkbox" onChange={props.handleShortMovies} checked={props.isShortMovies}/>
      <span className="filtercheckbox__visible-input"></span>
      Короткометражки
    </label>
  )
}

export default FilterCheckbox;