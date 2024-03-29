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
import Company from './pages/Companys/Company';
import RegisterCompany from './pages/Companys/Register/Register';
import Users from './pages/Users/Users';
import Reports from './pages/Reports/Reports';
import RegisterEvaluation from './pages/Evaluation/Register/Register';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={isAuthenticated() ? <Evaluation /> : <Home />}/>
            <Route path='/evaluations' element={isAuthenticated() ? <Evaluation /> : <Navigate to='/' />} />
            <Route path='/evaluations/register/:id' element={isAuthenticated() ? <RegisterEvaluation /> : <Navigate to='/' />} />
            <Route path='/products' element={isAuthenticated() ? <Products /> : <Navigate to='/' />} />
            <Route path='/products/register' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
            <Route path='/products/register/:id' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
            <Route path='/products/details/:id' element={isAuthenticated() ? <RegisterProduct /> : <Navigate to='/' />} />
            <Route path='/companys' element={isAuthenticated() ? <Company /> : <Navigate to='/' />} />
            <Route path='/companys/register' element={isAuthenticated() ? <RegisterCompany /> : <Navigate to='/' />} />
            <Route path='/companys/register/:id' element={isAuthenticated() ? <RegisterCompany /> : <Navigate to='/' />} />
            <Route path='/companys/details/:id' element={isAuthenticated() ? <RegisterCompany /> : <Navigate to='/' />} />
            <Route path='/users' element={isAuthenticated() ? <Users /> : <Navigate to='/' />} />
            <Route path='/reports' element={isAuthenticated() ? <Reports /> : <Navigate to='/' />} />
        </Route>
    )
);

export default function Router() {
    return <RouterProvider router={router} />
}