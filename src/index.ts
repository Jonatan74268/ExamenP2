import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
import CampeonesController from './service-layer/controllers/CampeonesController';

const app = express();
const port = 3001;

app.use(json());

const campeonesController = new CampeonesController();

campeonesController.mount(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
