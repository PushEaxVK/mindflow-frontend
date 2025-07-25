import css from './Container.module.css'; // Import the CSS module for this component

const Container = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
