import ReactDOM from 'react-dom';
import './index.css';
import dotenv from 'dotenv'
import App from './view/App';

dotenv.config({path: `./config/.env.${process.env.NODE_ENV}`})
if (process.env.NODE_ENV === 'production') console.log = ()=>{}

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  document.getElementById('root') as HTMLElement
  // </React.StrictMode>
);
