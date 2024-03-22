import mongoose from "mongoose"

const EmsSchema = new mongoose.Schema({
            name:{
                type:String
            },
            password:{
                type:String,
                require:true
            },
            email:{
                type:String
            },
            phone:{
                type:String
            },
            address:{
                type:String
            },
            role:{
                type:String
            },
            // orders:[
            //     {
            //         assign_to:{
            //             type:mongoose.Schema.Types.ObjectId,
            //             ref:"EMS"
            //         },
            //         status:{
            //             type:String,
            //             default:"pending"
            //         },
            //         task_detail:{
                        
            //         }
            //     }
            // ]
})



const milestoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  data: mongoose.Schema.Types.Mixed // Allows any data type
});

const taskSchema = new mongoose.Schema({
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status:{
    type:String,
    default:"ideal"
  },
  milestones: [milestoneSchema]
});

export const Task = mongoose.model('task', taskSchema);

export const User = mongoose.model("user",EmsSchema)



