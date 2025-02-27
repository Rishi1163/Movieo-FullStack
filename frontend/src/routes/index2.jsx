import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import ExplorePage from '../pages/ExplorePage'
import SearchPage from '../pages/SearchPage'
import DetailsPage from '../pages/DetailsPage'
import Login from '../pages/Login'
import { ProtectedRoute } from './ProtectedRoute'
import Register from '../pages/Register'
import WishilistPage from '../pages/WishlistPage'


const routerr = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path : 'register',
                element : <Register />
            },
            {
                path : 'login',
                element : <Login />
            },
            {
                element : <ProtectedRoute />,
                children : [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path : ':explore',
                        element : <ExplorePage />
                    },
                    {
                        path : ":explore/:id",
                        element : <DetailsPage />
                    },
                    {
                        path : "search",
                        element : <SearchPage />
                    },
                    {
                        path : "wishlist",
                        element : <WishilistPage />
                    }
                ]
            }
        ]
    }
])

export default routerr
