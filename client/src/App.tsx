import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AppRoutes from 'components/AppRoutes';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <AppRoutes />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
