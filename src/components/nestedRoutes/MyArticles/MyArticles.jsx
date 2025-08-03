import ArticlesList from '../../ArticlesList/ArticlesList';
import ProfileArticlesEmpty from '../../ProfileArticlesEmpty/ProfileArticlesEmpty';

const MyArticles = () => {
  return (
    <>
      <ProfileArticlesEmpty />
      <ArticlesList icon={'icon-edit-article'} btnStyle={'EditArticle'} />
    </>
  );
};

export default MyArticles;
