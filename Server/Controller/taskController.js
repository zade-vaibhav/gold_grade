import {Task} from '../Model/ems.js'
import milestones from './defaultMilestone.js';

// Controller function for handling task creation and assignment
export const createTask = async (req, res) => {
    try {
        // const taskDetails = req.body;
        const { customerId,superAdminId } = req.body;
       // Example super admin ID
        const newTask = await Task.create({ assignedTo: superAdminId, bookedBy: customerId,milestones });
        res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

 export const assignTaskToAdmin = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { adminId } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { assignedTo: adminId }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, message: `Task ${taskId} assigned to admin ${adminId}, task: updatedTask` });
    } catch (error) {
        console.error('Error assigning task to admin:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const assignTaskToEmployee = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { employeeId } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { assignedTo: employeeId }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, message: `Task ${taskId} assigned to employee ${employeeId}`, task: updatedTask });
    } catch (error) {
        console.error('Error assigning task to employee:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getMilestones = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, milestones: task.milestones });
    } catch (error) {
        console.error('Error fetching milestones:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const updateMilestoneByEmployee = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { index, milestone } = req.body;

        // Find the task by ID
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Update the milestone at the specified index
        if (index >= 0 && index < task.milestones.length) {
            task.milestones[index] = milestone;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid milestone index' });
        }

        // Save the updated task
        const updatedTask = await task.save();

        res.json({ success: true, message: 'Milestone updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error updating milestone:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


