import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchArticleById,
  fetchThreePopularArticles,
  toggleSaveBookmark,
} from '../../redux/article/operation';
import {
  selectArticle,
  selectIsArticlesLoading,
  selectPopularArticles,
} from '../../redux/article/selectors';
import Container from '../../components/Container/Container';
import NotFound from '../NotFound/NotFound';
import css from '../ArticlePage/ArticlePage.module.css';
import Loader from '../../components/Loader/Loader';
import { clearArticle } from '../../redux/article/slice.js';
const ArticlePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsArticlesLoading);
  const article = useSelector(selectArticle);
  const popular = useSelector(selectPopularArticles);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchArticleById(id));
    dispatch(fetchThreePopularArticles());
  }, [dispatch, id]);

  const handleClickReadMore = (listItem) => {
    clearArticle();
    navigate(`/articles/${listItem._id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    dispatch(toggleSaveBookmark(article._id));
  };

  if (isLoading) return <Loader />;
  if (!article) return <NotFound />;

  return (
    <section className={css.section}>
      <Container>
        <div className={css.firstBlock}>
          <h1 className={css.title}>{article.title}</h1>
          {article.img && (
            <img src={article.img} alt={article.title} className={css.img} />
          )}
        </div>
        <div className={css.secondBlock}>
          <p className={css.article}>
            {article.article.split('/n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <div className={css.blockBtnContainer}>
            <div className={css.interestedBlock}>
              <p className={css.articleAuthor}>
                Author:{' '}
                <span className={css.articleAuthorName}>
                  {article.author.name}
                </span>
              </p>
              <p className={css.articleDate}>
                Date:{' '}
                <span className={css.articleDateName}>
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </p>
              <h2 className={css.interestedBlockTitle}>
                You can also be interested
              </h2>

              <ul className={css.interestedList}>
                {popular.map((item) => (
                  <li key={item._id} className={css.interestedItem}>
                    <div className={css.interestedArticleTitleBtnContainer}>
                      <h4 className={css.interestedArticleTitle}>
                        {item.title}
                      </h4>
                      <button
                        onClick={() => handleClickReadMore(item)}
                        className={css.readMoreBtn}
                      >
                        <svg className={css.iconReadMore}>
                          <use href="/icons-articlePage.svg#icon-readMoreBtn"></use>
                        </svg>
                      </button>
                    </div>
                    {/* <p className={css.interestedArticleAuthor}>{item.name}</p> */}
                    <p className={css.interestedArticleAuthor}>Clark</p>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleSave} className={css.saveBtn}>
              <span className={css.saveBtnText}>Save</span>
              <svg className={css.iconSaveBtn}>
                <use href="/icons-articlePage.svg#icon-save"></use>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default ArticlePage;
