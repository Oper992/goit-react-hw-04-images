import style from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <div className={style.containerButton}>
      <button
        type="button"
        className={style.Button}
        onClick={this.props.onClick}
      >
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
