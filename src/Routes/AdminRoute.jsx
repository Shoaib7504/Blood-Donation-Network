import { Navigate} from 'react-router';
import useRole from '../Hooks/useRole';
import LoadingSpiner from '../Components/LoadingSpiner';

const AdminRoute = ({ children }) => {
    const { role, isReloading } = useRole()
    if (isReloading) return <LoadingSpiner></LoadingSpiner>
    if (role === 'admin') {
        return children;
    }
    return <Navigate to='/'></Navigate>
};

export default AdminRoute;