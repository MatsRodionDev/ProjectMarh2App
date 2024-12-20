import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import userApi from "./services/userApi";
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setLoading } from "./stores/slices/roleSlice";
import { setAccount} from "./stores/slices/accountSlice"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import Reports from "./pages/check";
import UserTable from "./pages/usersTablePage/UserTable";
import NavigationBar from "./components/NavBar";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const dispatch = useDispatch();
  const { role, loading } = useSelector((state) => state.role);

  useEffect(() => {
    const checkToken = async () => {
      dispatch(setLoading(true)); 

      const response = await userApi.checkToken();

      dispatch(setLoading(false)); 

      if (!response) {
        console.log('error');
        dispatch(setRole(null));
        dispatch(setAccount(null));
        return;
      }

      dispatch(setRole(response.roles));
      dispatch(setAccount(response));
     
    };
    
    checkToken();
    
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ); 
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;