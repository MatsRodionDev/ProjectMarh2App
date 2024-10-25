import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import serverApi from "./services/serverApi";

function App() {
  useEffect(() => {
    const checkToken = async () => {
      const response = await serverApi.checkToken();

      if (!response) {
        console.log('Ответ не получен или токен недействителен.');
      } else {
        console.log('Ответ:', response);
        // Обработайте успешную проверку токена (например, обновите состояние или перенаправьте)
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
