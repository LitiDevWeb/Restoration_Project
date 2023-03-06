import Container from '@/components/container/container';
import Navbar from '@/components/navbar/navbar';
import Navigation from '@/components/navigation/navigation';

const Calendar = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Navigation />
      </Container>
    </div>
  );
};

export default Calendar;
