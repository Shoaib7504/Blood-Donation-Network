import { Navigate} from 'react-router';
import useRole from '../Hooks/useRole';
import LoadingSpiner from '../Components/LoadingSpiner';

const VolunteerRoute = ({ children }) => {
    const { role, isReloading } = useRole()
    if (isReloading) return <LoadingSpiner></LoadingSpiner>
    if (role === 'volunteer') {
        return children;
    }
    return <Navigate to='/'></Navigate>
};

export default VolunteerRoute;