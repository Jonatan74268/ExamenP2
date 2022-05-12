import Campeon from "../../domain-layer/entities/Campeon";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindCampeonTask from "./AddCampeonTask";
import IAsyncTask from "./IAsyncTask";

export type UpdateCampeonData = {
  id: number;
  nombre: string;
  alias: string;
  rol: string;
  dificultad: string;
  historia: string;
  imagen: string;
}

export default class UpdateCampeonTask implements IAsyncTask<Campeon> {
  private updateCampeonData: UpdateCampeonData;

  public constructor(campeonData: UpdateCampeonData) {
    this.updateCampeonData = campeonData;
  }

  public async execute(): Promise<Campeon> {
    const findCampeonTask = new FindCampeonTask(this.updateCampeonData.id);

    const campeon = await findCampeonTask.execute();

    campeon.nombre = this.updateCampeonData.nombre;
    campeon.alias = this.updateCampeonData.alias;
    campeon.rol= this.updateCampeonData.rol;
    campeon.dificultad= this.updateCampeonData.dificultad;
    campeon.historia= this.updateCampeonData.historia;
    campeon.imagen= this.updateCampeonData.imagen;

    const databaseConnection = await DatabaseConnection.getInstance();
    const campeonRepository = databaseConnection.getRepository(Campeon);

    campeonRepository.save(campeon);

    return campeon;
  }
}