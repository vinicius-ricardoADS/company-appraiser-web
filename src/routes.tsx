import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import { isAuthenticated } from './utils/auth';
import Evaluation from './pages/Evaluation/Evaluation';
import Products from './pages/Products/Products';
import RegisterProduct from './pages/Products/Register/Register';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={isAuthenticated() ? <Evaluation /> : <Home />}/>
            <Route path='/evaluations' element={isAuthenticated() ? <Evaluation /> : <Navigate to='/' />} />
            <Route path='/products' element={isAuthenticated() ? <Products /> : <Navigate to='/' />} />
            <Route path='/products/register' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
            <Route path='/products/register/:id' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
            <Route path='/products/details/:id' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
        </Route>
    )
);

export default function Router() {
    return <RouterProvider router={router} />
}