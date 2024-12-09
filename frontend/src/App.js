import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import userApi from "./services/userApi";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from "./stores/slices/roleSlice";
import { setAccount} from "./stores/slices/accountSlice"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.role.role);

  useEffect(() => {
    const checkToken = async () => {
      const response = await userApi.checkToken()
      console.log(response)
      if(!response) {
        console.log('error')
        return
      }
      dispatch(setRole(response.roles))
      dispatch(setAccount(response))
      console.log(response.roles)
      
    };

    checkToken();
  }, []);

  return (
    <BrowserRouter> 
        <AppRouter/>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
