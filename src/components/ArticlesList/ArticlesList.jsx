import css from './ArticlesList.module.css';

import ArticlesItem from '../ArticlesItem/ArticlesItem.jsx';

const ArticlesList = ({
  icon = 'icon-edit-article',
  btnStyle = 'EditArticle',
}) => {
  return (
    <>
      <ul className={css.articlesList}>
        <ArticlesItem icon={icon} btnStyle={btnStyle} />
      </ul>
    </>
  );
};

export default ArticlesList;
