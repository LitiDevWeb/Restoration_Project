import Container from '@webapp/components/container/container';
import Navbar from '@webapp/components/navbar/navbar';
import Navigation from '@webapp/components/navigation/navigation';
import styles from './home.module.scss';

import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Navigation absolute />
      <Splide aria-label='My Favorite Images' className={styles['slider']}>
        <SplideSlide>
          <Container page={'home-A'}>
            <div className={styles['home-container']}>
              <p className={styles['home-title']}>
                <span>fennec</span> restoration & remodeling
              </p>
              <p className={styles['home-description']}>
                Our business is multidisciplinary, going from conception to execution, where the owner is an architect willing to offer his international experience to raise the
                standards of your living.
              </p>
            </div>
          </Container>
        </SplideSlide>
        <SplideSlide>
          <Container page={'home-B'}>
            <div className={styles['home-container']}>
              <p className={styles['home-title']}>
                <span>renovation</span> for every budget
              </p>
              <p className={styles['home-description']}>We believe that a budget work can also be a quality work.</p>
            </div>
          </Container>
        </SplideSlide>
        <SplideSlide>
          <Container page={'home-C'}>
            <div className={styles['home-container']}>
              <p className={styles['home-title']}>
                <span>restore</span> and remodel your dream house
              </p>
              <p className={styles['home-description']}>
                We understand that quality is in detail, although everybody has its own definition of quality job, we always give the last word to the customer in order to meet
                their expectations.
              </p>
            </div>
          </Container>
        </SplideSlide>
      </Splide>
    </div>
  );
}
