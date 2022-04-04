import { Router } from 'express';
import academyMessage from '../Controller/academyMessage';

const routes = new Router();

routes.post('/academy', academyMessage.send);

export default routes;
