import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import userApi from "./services/userApi";

function App() {
  useEffect(() => {
    const checkToken = async () => {
      const response = await userApi.checkToken()

      if(!response) {
        console.log('error')
      }
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
