import { default as bookRoute } from './books';
import { default as imageRoute } from './image';
import { default as authRoute } from './auth';
import { default as commentRoute } from './comment';
import { default as cartRoute} from './cart';

export { default as homePage } from './pages/home';
export { default as bookPage } from './pages/book';
export { default as blogPage } from './pages/blogs';
export { default as signInPage } from './pages/sign-in';
export { default as signUpPage } from './pages/sign-up';
export { default as categoryPage } from './pages/category';
export { default as cartPage } from './pages/cart';

export const apiRoutes = [bookRoute, imageRoute, authRoute, commentRoute, cartRoute];
