import {createBrowserRouter} from 'react-router-dom';
import Root from './pages/root/Root';
import Home from './pages/home/Home';

import { getAllRestaurants, getRestaurantById } from './utils/api/restaurant';
import RestaurantDetail from './pages/restaurantDetail/restaurantDetail';

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
        ]
    },
    
])

export default router;