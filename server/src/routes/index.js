import { Router } from 'express';
import passport from '../helpers/passport';
import authRoute from './auth';
import userRoutes from "./users";

const routes = new Router();

routes.use(passport.initialize());
routes.use(passport.session());

routes.use('/auth', authRoute)
routes.use('/users', userRoutes);

export default routes;