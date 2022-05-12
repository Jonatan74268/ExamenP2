import { Request, Response } from 'express';
import AddCampeonTask, { AddCampeonData } from '../tasks/AddCampeonTask';
import DeleteCampeonTask from '../tasks/DeleteCampeonTask';
import FindCarTask from '../tasks/FindCampeonTask';
import GetCampeonListTask from '../tasks/GetCampeonListTask';
import UpdateCampeonTask, { UpdateCampeonData } from '../tasks/UpdateCampeonTask';
import BaseController from './BaseController';

export default class CampeonesController extends BaseController {
  public constructor() {
    super('/campeones');
  }

  protected configureRouter(): void {
    this.router.get('/', this.getCampeonesList.bind(this));
    this.router.get('/:id', this.findCampeon.bind(this));
    this.router.post('/', this.addCampeon.bind(this));
    this.router.put('/', this.updateCampeon.bind(this));
    this.router.delete('/:id', this.deleteCampeon.bind(this));
  }

  private async getCampeonesList(req: Request, res: Response): Promise<void> {
    try {
      const getCampeonListTask = new GetCampeonListTask();

      const campeonesList = await getCampeonListTask.execute();

      this.respond(res, 200, campeonesList);
    } catch (e) {
      this.respond(res, 500);
    }
  }

  private async findCampeon(req: Request, res: Response): Promise<void> {
    try {
      const campeonId = parseInt(req.params.id);
      const getCampeonListTask = new FindCarTask(campeonId);

      const campeon = await getCampeonListTask.execute();

      this.respond(res, 200, campeon);
    } catch (e) {
      if ((<Error>e).message === 'Campeon not found.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async addCampeon(req: Request, res: Response): Promise<void> {
    try {
      const campeonData = <AddCampeonData>req.body;

      const addCampeonTask = new AddCampeonTask(campeonData);

      const campeon = await addCampeonTask.execute();

      this.respond(res, 200, campeon);
    } catch (e) {
      this.respond(res, 500);
    }
  }

  private async updateCampeon(req: Request, res: Response): Promise<void> {
    try {
      const campeonData = <UpdateCampeonData>req.body;

      const updateCampeonTask = new UpdateCampeonTask(campeonData);

      const updatedCampeon = await updateCampeonTask.execute();

      this.respond(res, 200, updatedCampeon);
    } catch (e) {
      if ((<Error>e).message === 'Campeon not found.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async deleteCampeon(req: Request, res: Response): Promise<void> {
    try {
      const campeonId = parseInt(req.params.id);
      const deleteCampeonTask = new DeleteCampeonTask(campeonId);

      await deleteCampeonTask.execute();

      this.respond(res, 200);
    } catch (e) {
      this.respond(res, 500);
    }
  }
}
