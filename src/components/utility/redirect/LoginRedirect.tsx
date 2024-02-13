import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthProvider';
import { ChildrenType } from '../type/ChildrenType';

export const LoginRedirect = (props: ChildrenType) => {
  const { user } = useAuthContext();
  return !user ? props.children : <Navigate to="/1" />;
};
