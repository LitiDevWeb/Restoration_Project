import Container from '@webapp/components/container/container';
import Navbar from '@webapp/components/navbar/navbar';
import Navigation from '@webapp/components/navigation/navigation';
import PageTitle from '@webapp/components/page-title/page-title';
import Image from 'next/image';
import styles from './services.module.scss';

const ServiceCard = ({ image, text }: { image: string; text: string }) => {
  return (
    <div className={styles['service-card']}>
      <Image src={image} width={490} height={530} alt={text} />
      <div className={styles['white-box']}>
        <p>{text}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div>
      <Navbar />
      <Container page='services'>
        <Navigation />
        <div className={styles['services']}>
          <PageTitle>
            <>
              <span>Our</span> Services
            </>
          </PageTitle>
          <div className={styles['card-container']}>
            <ServiceCard text='Design' image='/images/design.png' />
            <ServiceCard text='Remodeling' image='/images/remodeling.png' />
            <ServiceCard text='Restoration' image='/images/restoration.png' />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
