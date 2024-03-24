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
 

export const login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(password)
        const isUser=await User.findOne({email});

        if(isUser){
             if(isUser.password==password){
                res.status(200).json({ success: true, message: 'employee login successfully'});
             }else{
                res.status(400).json({ success: false, message: 'Invalid Credentials!!'});
             }
        }else{
            res.status(404).json({ success: false, message: 'no employ found!!' });
        }
    }
    catch{
 res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


