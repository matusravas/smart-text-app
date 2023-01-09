import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv'

dotenv.config({path: `./config/.env.${process.env.NODE_ENV}`})
if (process.env.NODE_ENV === 'production') console.log = ()=>{}

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  document.getElementById('root') as HTMLElement
  // </React.StrictMode>
);
