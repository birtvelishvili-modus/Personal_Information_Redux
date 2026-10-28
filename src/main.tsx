import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App.tsx';
import './index.css';

/**
 * აპლიკაციის საწყისი წერტილი (Entry Point).
 * React DOM-ის ინიციალიზაცია და მთელი აპლიკაციის შეფუთვა Redux Provider-ით,
 * რათა გლობალური State ხელმისაწვდომი იყოს ყველა ქვეკომპონენტისთვის.
 */
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
