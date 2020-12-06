import {useLocation} from 'react-router-dom';

export function useIsActivePath(activePath?: string): boolean {
  const {pathname} = useLocation();
  return activePath !== undefined && pathname.startsWith(activePath);
}
