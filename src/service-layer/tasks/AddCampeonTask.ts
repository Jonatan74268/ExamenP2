import Campeon from '../../domain-layer/entities/Campeon';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export type AddCampeonData = {
  nombre: string;
  alias: string;
  rol: string;
  dificultad: string;
  historia: string;
  imagen: string;
};

export default class AddCampeonTask implements IAsyncTask<Campeon> {
  private addCampeonData: AddCampeonData;

  public constructor(addCampeonData: AddCampeonData) {
    this.addCampeonData = addCampeonData;
  }

  public async execute(): Promise<Campeon> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const campeonRepository = databaseConnection.getRepository(Campeon);

    const campeon = campeonRepository.save(this.addCampeonData);

    return campeon;
  }
}
