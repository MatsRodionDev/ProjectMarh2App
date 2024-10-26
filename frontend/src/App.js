import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import userApi from "./services/userApi";
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from "./stores/slices/roleSlice";

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
      console.log(response.roles)
      
    };

    checkToken();
  }, []);

  return (
    <BrowserRouter> 
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
