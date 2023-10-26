import './BurgerMenu.css';

function Burger({ onMenuPopup }) {
    return (
        <button
            className='burger__button'
            type='button'
            onClick={onMenuPopup}
        />
    );
  }

  export default Burger;