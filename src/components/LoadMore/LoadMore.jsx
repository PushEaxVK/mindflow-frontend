import css from './LoadMore.module.css';

const LoadMore = () => {
  return (
    <div className={css.LoadMore}>
      <button className={css.btnLoadMore}>Load More</button>
    </div>
  );
};

export default LoadMore;
