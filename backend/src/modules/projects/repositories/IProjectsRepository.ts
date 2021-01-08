import Project from '../infra/typeorm/entities/Projects';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  // findWithSameName(name: string): Promise<Project | undefined>;
  // findAllForUser(user_id: string): Promise<Project[]>;
}
