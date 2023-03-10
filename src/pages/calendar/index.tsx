import Container from '@webapp/components/container/container';
import Navbar from '@webapp/components/navbar/navbar';
import Navigation from '@webapp/components/navigation/navigation';

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
