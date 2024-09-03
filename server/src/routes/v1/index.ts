import { Router } from 'express';
import issueRoutes from './IssueRoutes';

export default () => {
  const routes = Router();

  routes.use('/issues', issueRoutes);

  return routes;
};
