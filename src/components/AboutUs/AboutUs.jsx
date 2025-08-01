import styles from './AboutUs.module.css';
import Container from '../../components/Container/Container';

function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <Container noVerticalPadding>
        <div className={styles.topRow}>
          <div className={styles.content}>
            <h2 className={styles.title}>About us</h2>
            <p className={styles.text}>
              Harmoniq is a mindful publishing platform dedicated to mental
              health and well-being. We bring together writers, thinkers, and
              readers who believe that open, thoughtful stories can heal,
              inspire, and connect. Whether you&#39;re here to share your
              journey or learn from others — this is your space to slow down,
              reflect, and grow.
            </p>
          </div>
          <picture>
            <source
              srcSet="
            /img/Image-d-1x.jpg 1x,
            /img/Image-d-2x.jpg 2x
          "
              media="(min-width: 1440px)"
            />
            <source
              srcSet="
            /img/Image-1-t-1x.jpg 1x,
            /img/Image-1-t-1x.jpg 2x
          "
              media="(min-width: 768px)"
            />
            <source
              srcSet="
            /img/Image-m-1x.jpg 1x,
            /img/Image-m-2x.jpg  2x
          "
              media="(max-width: 767px)"
            />
            <img
              className={styles.imgTopRight}
              src="/img/Image-d-1x.jpg"
              alt="Lotus flower"
            />
          </picture>
        </div>
        <ul className={styles.imgRow}>
          <li>
            <picture>
              <source
                srcSet="
            /img/Image-2-d-1x.jpg 1x,
            /img/Image-2-d-2x.jpg 2x
          "
                media="(min-width: 1440px)"
              />
              <source
                srcSet="
            /img/Container-t-1x.jpg 1x,
            /img/Container-t-2x.jpg 2x
          "
                media="(min-width: 768px)"
              />
              <source
                srcSet="
            /img/Image-2-m-1x.jpg 1x,
            /img/Image-2-m-2x.jpg 2x
          "
                media="(max-width: 767px)"
              />
              <img
                className={styles.img}
                src="/img/Image-2-d-1x.jpg"
                alt="Group hugging at sunset"
              />
            </picture>
          </li>
          <li>
            <picture>
              <source
                srcSet="
            /img/Image-3-d-1x.jpg 1x,
            /img/Image-3-d-1x.jpg 2x
          "
                media="(min-width: 1440px)"
              />
              <img
                className={styles.imgtwo}
                src="/img/Image-3-d-1x.jpg"
                alt="Person meditating at sunrise"
              />
            </picture>
          </li>
        </ul>
      </Container>
    </section>
  );
}

export default AboutUs;
