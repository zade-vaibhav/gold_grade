import { Router } from 'express';
import { createTask ,assignTaskToEmployee, getMilestones, updateMilestoneByEmployee, assignTaskToAdmin } from '../Controller/taskController.js';
import { createUser, getAllUsers, getUser } from '../Controller/userController.js';
const router = Router();

router.post('/user',createUser);
// Define routes for tasks
router.post('/', createTask);
router.post('/:taskId/assign/admin', assignTaskToAdmin);
router.post('/:taskId/assign/employee', assignTaskToEmployee);
router.get('/:taskId/milestones', getMilestones);
router.post('/:taskId/milestones', updateMilestoneByEmployee);
// get user and and task
router.get('/getUser', getUser);
router.get('/getAllUsers', getAllUsers);

export default router; 