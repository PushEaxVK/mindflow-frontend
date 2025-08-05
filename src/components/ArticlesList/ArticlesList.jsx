import css from './ArticlesList.module.css';

import ArticlesItem from '../ArticlesItem/ArticlesItem';

const ArticlesList = ({
  icon = 'icon-edit-article',
  btnStyle = 'EditArticle',
  queryArticles = [],
  lastArticleRef,
}) => {
  return (
    <>
      <ul className={css.articlesList}>
        {queryArticles &&
          queryArticles.map((item, index) => {
            const isLast = index === queryArticles.length - 1;
            return (
              <ArticlesItem
                icon={icon}
                btnStyle={btnStyle}
                key={`${item._id}-${index}`}
                item={item}
                ref={isLast ? lastArticleRef : null}
              />
            );
          })}
      </ul>
    </>
  );
};

export default ArticlesList;
