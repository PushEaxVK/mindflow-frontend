import css from './ArticlesList.module.css';
const ArticlesList = () => {
  return (
    <>
      <ul className={css.articlesList}>
        <li className={css.articlesItem}>
          <img
            className={css.imgArticle}
            src="https://res.cloudinary.com/dfoiy9rn5/image/upload/v1753462124/article_img-2_whyhpt.png"
            alt=""
          />
          <div className={css.infoArticle}>
            <p className={css.authorArticle}>Clark</p>
            <p className={css.title}>
              When Anxiety Feels Like a Room With No Doors
            </p>
            <p className={css.desc}>
              10 advices how mediations can help you feeling better
            </p>
          </div>
          <div className={css.navButton}>
            <a href="" className={css.btnLearnMore} aria-label="Learn more">
              Learn more
            </a>
            <button aria-label="edit Article" className={css.btnEditArticle}>
              <svg
                className={css.svgIconEditArticle}
                width="14.25"
                height="14.25"
              >
                <use href="../../../public/icons-profileArticles.svg#icon-edit-article"></use>
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ArticlesList;
