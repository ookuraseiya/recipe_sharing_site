import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { RecipeDetail } from './pages/RecipeDetail';
import './css/styles.css';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthProvider';
import { UnLoginRedirect } from './components/utility/redirect/UnLoginRedirect';
import { LoginRedirect } from './components/utility/redirect/LoginRedirect';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginRedirect>
                  <Login />
                </LoginRedirect>
              }
            />

            <Route
              path="/:pageId"
              element={
                <UnLoginRedirect>
                  <Main />
                </UnLoginRedirect>
              }
            />
            <Route
              path="/recipeDetail/:recipeId"
              element={
                <UnLoginRedirect>
                  <RecipeDetail />
                </UnLoginRedirect>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
