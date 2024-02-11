import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { RecipeDetail } from './pages/RecipeDetail';
import './css/styles.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:pageId" element={<Main />} />
          <Route path="/recipeDetail/:recipeId" element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
