import { getRepository, Repository, Raw } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '../entities/Projects';


class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  // public async findWithSameName(

  // )
  // public async findAllForUser({
  //   project_idstructure
  //     },
  //   });

  //   return appointments;
  // }

  public async create({
    name,
    createdBy_id,
    responsable_id,
    structure,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      createdBy_id,
      responsable_id,
      structure,
    });

    await this.ormRepository.save(project);

    return project;
  }
}

export default ProjectsRepository;
