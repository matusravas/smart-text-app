import ReactDOM from 'react-dom';
import './index.css';
import dotenv from 'dotenv'
import { Root } from './view/Root';

dotenv.config({path: `./config/.env.${process.env.NODE_ENV}`})
if (process.env.NODE_ENV === 'production') console.log = ()=>{}

ReactDOM.render(
  // <React.StrictMode>
  <Root />,
  document.getElementById('root') as HTMLElement
  // </React.StrictMode>
);
