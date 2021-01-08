import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, structure } = request.body;

    const createdBy_id = user_id;
    const responsable_id = user_id;
    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      createdBy_id,
      responsable_id,
      structure,
    });
    return response.json(project);
  }
}
