import css from './ArticlesList.module.css';

import ArticlesItem from '../ArticlesItem/ArticlesItem';

const ArticlesList = ({
  icon = 'icon-edit-article',
  btnStyle = 'EditArticle',
  queryArticles = [],
}) => {
  //console.log(queryArticles);
  return (
    <>
      <ul className={css.articlesList}>
        {queryArticles &&
          queryArticles.map((item) => (
            <ArticlesItem
              icon={icon}
              btnStyle={btnStyle}
              key={item._id}
              item={item}
            />
          ))}
      </ul>
    </>
  );
};

export default ArticlesList;

//  <ArticlesList
//       icon={'icon-favorite-article'}
//       btnStyle={'FavoriteArticle'}
//     /> для іконки saved прописуємо ці пропси

//  <ArticlesList
//     icon={'icon-edit-article'} btnStyle={'EditArticle'}
//     /> для іконки edit прописуємо ці пропси
