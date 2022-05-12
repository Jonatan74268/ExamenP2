import Campeon from '../../domain-layer/entities/Campeon';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class FindCampeonTask implements IAsyncTask<Campeon> {
  private campeonId: number;
  
  public constructor(campeonId: number) {
    this.campeonId = campeonId;
  }

  public async execute(): Promise<Campeon> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const campeonRepository = databaseConnection.getRepository(Campeon);

    const campeon = await campeonRepository.findOneBy({ id: this.campeonId });

    if (!campeon) {
      throw new Error('Campeon not found.');
    }

    return campeon;
  }
}
