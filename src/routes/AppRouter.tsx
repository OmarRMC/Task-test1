import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import { AuthProvider } from '../contexts/AuthContext';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import CategoryPage from '../pages/CategoryPage';
import TagPage from '../pages/TagPage';

function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute> <MainLayout /> </PrivateRoute>}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/category" element={<PrivateRoute> <MainLayout /> </PrivateRoute>}>
          <Route index element={<CategoryPage />} />
        </Route>

        <Route path="/tag" element={<PrivateRoute> <MainLayout /> </PrivateRoute>}>
          <Route index element={<TagPage />} />
        </Route>

        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;
