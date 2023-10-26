import './Preloader.css';

const Preloader = ({ isOpen }) => {
    return (
        <div className={`preloader ${isOpen ? 'preloader_is-opened' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader