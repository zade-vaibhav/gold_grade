import { Router } from 'express';
import { createTask ,assignTaskToEmployee, getMilestones, updateMilestoneByEmployee, assignTaskToAdmin } from '../Controller/taskController.js';
import { createUser } from '../Controller/userController.js';
const router = Router();

router.post('/user',createUser);
// Define routes for tasks
router.post('/', createTask);
router.post('/:taskId/assign/admin', assignTaskToAdmin);
router.post('/:taskId/assign/employee', assignTaskToEmployee);
router.get('/:taskId/milestones', getMilestones);
router.post('/:taskId/milestones', updateMilestoneByEmployee);

export default router; 