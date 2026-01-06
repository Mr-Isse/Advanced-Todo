import mongoose from "mongoose";

const {Schema}=mongoose;

const TodoSchema= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    title:{
        type: String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
},
{
    timestamps:true
})

const Todo=mongoose.model('Todo', TodoSchema);
export default Todo;