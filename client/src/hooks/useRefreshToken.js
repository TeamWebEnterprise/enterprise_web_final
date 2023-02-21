import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.refreshToken);
            return {
                ...prev,
                refreshToken: response.data.refreshToken
            }
        });
        return response.data.refreshToken;
    }
    return refresh;
};

export default useRefreshToken;