const ArticleList = () => {
  return (
    <>
      <ul class="articlesList">
        <li class="articlesItem">
          <img
            class="imgArticle"
            src="https://res.cloudinary.com/dfoiy9rn5/image/upload/v1753462124/article_img-2_whyhpt.png"
            alt=""
          />
          <div class="infoArticle">
            <p class="authorArticle">Clark</p>
            <p class="title">When Anxiety Feels Like a Room With No Doors</p>
            <p class="desc">
              10 advices how mediations can help you feeling better
            </p>
          </div>
          <div class="navButton">
            <a href="" class="btnLearnMore" aria-label="Learn more">
              Learn more
            </a>
            <button aria-label="edit Article" class="btnEditArticle">
              <svg class="svgIconEditArticle" width="14.25" height="14.25">
                <use href="/asset/icons-profileArticles.svg#icon-edit-article"></use>
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ArticleList;
