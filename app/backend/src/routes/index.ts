import { Router } from 'express';
import teamsRouter from './team.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
