import { useState } from 'react';
import Container from '@webapp/components/container/container';
import Navbar from '@webapp/components/navbar/navbar';
import Navigation from '@webapp/components/navigation/navigation';
import styles from './work.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { kitchenImages } from '@webapphelpers/get-images/get-kitchen';
import { patioImages } from '@webapphelpers/get-images/get-patio';
import { miscellaneousImages } from '@webapphelpers/get-images/get-miscellaneous';
import { bedroomImages } from '@webapphelpers/get-images/get-bedroom';
import { bathroomImages } from '@webapphelpers/get-images/get-bathroom';
import Button from '@webappcomponents/button/button';

const Work = () => {
  const [part, setPart] = useState(kitchenImages);
  const [active, setActive] = useState('Kitchen');

  return (
    <div>
      <Navbar />
      <Container page='work' calculatedHeight>
        <Navigation />
        <div className={styles['work']}>
          <div className={styles['filters']}>
            <Button
              onClick={() => {
                setPart(kitchenImages);
                setActive('Kitchen');
              }}
              label={'Kitchen'}
              active={active === 'Kitchen'}
            />
            <Button
              onClick={() => {
                setPart(bathroomImages);
                setActive('Bathroom');
              }}
              label={'Bathroom'}
              active={active === 'Bathroom'}
            />
            <Button
              onClick={() => {
                setPart(bedroomImages);
                setActive('Bedroom');
              }}
              label={'Bedroom'}
              active={active === 'Bedroom'}
            />
            <Button
              onClick={() => {
                setPart(patioImages);
                setActive('Patio');
              }}
              label={'Patio'}
              active={active === 'Patio'}
            />
            <Button
              onClick={() => {
                setPart(miscellaneousImages);
                setActive('Miscellaneous');
              }}
              label={'Miscellaneous'}
              active={active === 'Miscellaneous'}
            />
          </div>
          <Splide
            aria-label='My Favorite Images'
            className={styles['slider']}
            options={{
              gap: '50px',
              perPage: 3,
            }}
          >
            {part.map((image: any) => (
              <SplideSlide key={image.src}>
                <img src={image.src} alt={`image-${image.src}`} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </Container>
    </div>
  );
};

export default Work;
