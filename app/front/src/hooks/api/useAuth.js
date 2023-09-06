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

    return { isAuthenticated, user, handleLogin, handleLogout };
}

export { useAuth };