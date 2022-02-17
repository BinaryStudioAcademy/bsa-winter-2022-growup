import App from 'components/app/app';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'store/store';
import './assets/scss/styles.scss';

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <NotificationContainer />
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
