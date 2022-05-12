import Campeon from '../../domain-layer/entities/Campeon';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class GetCampeonListTask implements IAsyncTask<Campeon[]> {
  public async execute(): Promise<Campeon[]> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const campeonRepository = databaseConnection.getRepository(Campeon);
    return campeonRepository.find();
  }
}
