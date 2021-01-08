import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

import Project from '../infra/typeorm/entities/Projects';

interface IRequest {
  name: string;
  createdBy_id: string;
  responsable_id: string;
  structure: string;
}

@injectable()
class CreateProjectService {
  
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    createdBy_id,
    responsable_id,
    structure
  }: IRequest): Promise<Project> {

    // const findProjectWithSameName = await this.projectsRepository
    //   .findWithSameName(name);

    // if (findProjectWithSameName) {
    //   throw new AppError('This name already existes');
    // }
    console.log("entrou aqui")
    const project = await this.projectsRepository.create({
      name,
      createdBy_id,
      responsable_id: createdBy_id,
      structure
    });

    await this.notificationsRepository.create({
      recipient_id: createdBy_id,
      content: `New project created ${name}`,
    });

    await this.cacheProvider.invalidate(
      `user-projects:${createdBy_id}`,
    );

    return project;
  }
}

export default CreateProjectService;
