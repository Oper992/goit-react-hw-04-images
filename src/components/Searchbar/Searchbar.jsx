import style from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  return (
    <header className={style.Searchbar}>
      <form className={style.Searchform} onSubmit={onSubmit}>
        <button type="submit" className={style['SearchForm-button']}>
          <ImSearch />
        </button>
        <input
          className={style['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="паляниця..."
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
