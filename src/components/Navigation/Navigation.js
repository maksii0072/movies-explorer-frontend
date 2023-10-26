import React from 'react';
import Burger from '../BurgerMenu/BurgerMenu';
import LoggedIn from '../LoggedIn/LoggedIn';

function Navigation({ onMenuPopup }) {
    return (
        <>
            <Burger onMenuPopup={onMenuPopup} />
            <LoggedIn />
        </>
    );
  }

  export default Navigation;

