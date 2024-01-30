import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsController = new TeamController();

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getTeamById(req, res));

export default teamsRouter;
