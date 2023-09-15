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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={isAuthenticated() ? <Evaluation /> : <Home />}/>
            <Route path='/evaluations' element={isAuthenticated() ? <Evaluation /> : <Navigate to='/' />} />
        </Route>
    )
);

export default function Router() {
    return <RouterProvider router={router} />
}