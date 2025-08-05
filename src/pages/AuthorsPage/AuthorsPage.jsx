import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LoadMore from '../../components/LoadMore/LoadMore.jsx';
import Container from '../../components/Container/Container.jsx';
import AuthorsList from '../../components/AuthorsList/AuthorsList.jsx';
import s from './AuthorsPage.module.css';
import Loader from '../../components/Loader/Loader.jsx';

const LIMIT = 20;

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAuthors(1, true);
  }, []);

  const loadAuthors = async (pageToLoad = 1, reset = false) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `/users?page=${pageToLoad}&perPage=${LIMIT}`
      );

      const newAuthors = response.data?.data?.users || [];

      const pagination = response.data?.data?.pagination || {};
      const totalPagesFromBackend =
        pagination.totalPages ||
        Math.ceil((pagination.totalItems?.total || 0) / LIMIT) ||
        1;

      setAuthors((prev) => (reset ? newAuthors : [...prev, ...newAuthors]));
      setTotalPages(totalPagesFromBackend);
      setPage(pageToLoad);
    } catch (err) {
      console.error('Помилка при завантаженні авторів:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    loadAuthors(nextPage);
  };

  const hasMore = page < totalPages;

  return (
    <section>
      <Container>
        <h1 className={s.title}>Authors</h1>
        {isLoading && <Loader />}
        <div className={s.authorsList} ref={listRef}>
          {authors.length > 0 ? (
            <AuthorsList authors={authors} />
          ) : (
            <p>Авторів не знайдено.</p>
          )}
        </div>

        {hasMore && (
          <LoadMore
            page={page}
            pages={totalPages}
            onLoadMore={handleLoadMore}
          />
        )}
      </Container>
    </section>
  );
};

export default AuthorsPage;
