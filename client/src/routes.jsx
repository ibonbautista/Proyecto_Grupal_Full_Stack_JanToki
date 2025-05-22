import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/root/Root';
import Home from './pages/home/Home';

import { getAllRestaurants, getRestaurantById } from './utils/api/restaurant';
import RestaurantDetail from './pages/restaurantDetail/restaurantDetail';
import Profile from './pages/profile/Profile';
import CategoriesList from './components/categoriesList/CategoriesList';

const router  = createBrowserRouter([
    {
        path : "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: getAllRestaurants
            },
			{
				path: "/restaurant/:id",
				element: <RestaurantDetail />,
				loader: getRestaurantById
			},
            {
                path: "/profile",
                element: <Profile />,
            }
        ]
    },
    
])

export default router;