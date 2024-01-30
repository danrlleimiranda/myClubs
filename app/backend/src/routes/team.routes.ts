import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsController = new TeamController();

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));

export default teamsRouter;
