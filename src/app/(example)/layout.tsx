import {PropsWithChildren} from 'react';
import '@/utils/styles/reset.css';
import '@/utils/styles/global.css';
import './layout.css';

export default function Layout({children}: PropsWithChildren) {
  return children;
}
