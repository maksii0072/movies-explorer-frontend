import './InfoToolTip.css';

function InfoTooltip({ onClose, isSuccess, InfoTooltipPopup }) {
  return (
    <div className={`popup ${InfoTooltipPopup ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          id="success-close-button"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__signup-title">{`${
          isSuccess ? 'Успех!' : 'Что-то пошло не так! Попробуйте ещё раз.'
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;