import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/root/Root';
import RestaurantsList from './pages/restaurantsList/RestaurantsList';
import Auth from './pages/auth/Auth';

import { getAllRestaurants } from './utils/api/restaurant';

const router  = createBrowserRouter([
    {
        path : "/",
        element: <Root />,
        children: [
            {
                path: "/restaurant",
                element: <RestaurantsList />,
                loader: getAllRestaurants
            },
        ]
    },
    
])

export default router;