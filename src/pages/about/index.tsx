import Container from '@webapp/components/container/container';
import Navbar from '@webapp/components/navbar/navbar';
import Navigation from '@webapp/components/navigation/navigation';
import PageTitle from '@webapp/components/page-title/page-title';
import Image from 'next/image';
import styles from './about.module.scss';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const WorkLine = ({ text }: { text: string }) => {
  return (
    <div className={styles['work-line']}>
      <BsFillArrowRightSquareFill size={30} />
      <p>{text}</p>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <Navbar />
      <Container page='about-us'>
        <Navigation />
        <div className={styles['about-us-headline']}>
          <PageTitle>
            <>
              About <span>Us</span>
            </>
          </PageTitle>
        </div>
        <div className={styles['about']}>
          <div className={styles['image-container']}>
            <Image alt='logo' src={'/images/salim.png'} width={600} height={800} />
          </div>
          <div className={styles['text-container']}>
            <div className={styles['subtext-container']}>
              <p className={styles['title']}>
                <span>Welcome to</span>
                <p>Fennec Restoration and Remodeling</p>
              </p>
              <p className={styles['description']}>We are a licensed, bonded and insured residential contractors based in phoenix Arizona.</p>
              <div className={styles['work-attributes']}>
                <WorkLine text='High Quality Work.' />
                <WorkLine text='Remodeling Experts.' />
                <WorkLine text='Experienced Team.' />
                <WorkLine text='24/7 Help Support.' />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
