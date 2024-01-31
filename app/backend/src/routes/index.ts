import { Router } from 'express';
import teamsRouter from './team.routes';
import loginRouter from './login.routes';
import matchRouter from './match.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchRouter);

export default router;
