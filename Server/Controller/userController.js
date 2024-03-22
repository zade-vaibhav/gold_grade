import {User}  from "../Model/ems.js";

export const createUser = async (req, res) => {
    try {
        const { name,password,email,phone,address,role } = req.body;
        console.log(name,password,email,phone,address,role)
        const newUser=await new User({name,password,email,phone,address,role}).save()
        console.log(newUser)
        res.status(201).json({ success: true, message: 'Task created successfully', task:newUser });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


