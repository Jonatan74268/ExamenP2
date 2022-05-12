import Campeon from '../../domain-layer/entities/Campeon';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class DeleteCampeonTask implements IAsyncTask<void> {
  private campeonId: number;
  
  public constructor(campeonId: number) {
    this.campeonId = campeonId;
  }

  public async execute(): Promise<void> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const campeonRepository = databaseConnection.getRepository(Campeon);

    await campeonRepository.delete(this.campeonId);
  }
}