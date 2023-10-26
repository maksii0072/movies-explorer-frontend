import { TIME_UNIT }  from './Constants/constants';

export default function duration(movieDuration) { // Переводит продолжительность фильма в часы:минуты
    const hours = Math.floor(movieDuration / TIME_UNIT);
    const minutes = movieDuration % TIME_UNIT;
    return `${hours ? `${hours}ч` : ''} ${minutes ? `${minutes}м` : ''}`
}
