import clsx from 'clsx';
import css from './Container.module.css'; // Import the CSS module for this component

const Container = ({ children, noVerticalPadding }) => {
  return (
    <div
      className={clsx(css.container, !noVerticalPadding && css.verticalPadding)}
    >
      {children}
    </div>
  );
};

export default Container;
