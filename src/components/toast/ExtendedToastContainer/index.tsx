import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import {ToastContainer} from 'react-toastify';

export default function ExtendedToastContainer() {
  // container 관련 셋팅 추가

  return (
    <ToastContainer containerId="snackBarDefaultWithProfileType" />
  )
}
