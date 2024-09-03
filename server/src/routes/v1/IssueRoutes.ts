import { Router } from 'express';
import IssueController from 'src/controllers/IssueController';

const router = Router();

router.post('/', IssueController.createIssue);
router.get('/:id', IssueController.readIssue);
router.patch('/:id', IssueController.updateIssue);
router.delete('/:id', IssueController.deleteIssue);

export default router;
