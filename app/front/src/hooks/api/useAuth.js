import { useSelector, useDispatch} from "react-redux";
import { login, logout } from "../../store/Slice/authSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const handleLogin = (user, token) => {
        dispatch(login({ user, token }));
    }

    const handleLogout = () => {
        dispatch(logout());
        window.location.replace("/");
    }

    const isTokenExpired = () => {
        //expiration for 1 day (86400 seconds)
        const expiration = 86400;
        const now = Date.now() / 1000;
        const token = localStorage.getItem("token");
        return now > token + expiration;
    }

    return { isAuthenticated, user, handleLogin, handleLogout, isTokenExpired };
}

export { useAuth };