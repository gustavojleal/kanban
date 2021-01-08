import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectController();

// projectsRouter.use(ensureAuthenticated);

projectsRouter.post(
  '/projects',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      structure: Joi.required()
    },
  }),
  projectsController.create,
);

projectsRouter.get('/projects');
// projectsRouter.get('/me', providerAppointmentsController.index);

export default projectsRouter;
