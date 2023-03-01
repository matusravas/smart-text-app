import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './view/Root';

if (process.env.REACT_APP_ENV && ['production'].includes(process.env.REACT_APP_ENV)) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

ReactDOM.render(
  // <React.StrictMode>
  <Root />,
  document.getElementById('root') as HTMLElement
  // </React.StrictMode>
);
