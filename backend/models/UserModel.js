import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator'

const {Schema}=mongoose;

const UserSchema= new Schema({
    username: {
        type: String,
        required:true,
        unique:true,
        lowecase:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, "Please Enter a valid email address"]
    },
    password:{
        type:String,
        required:true,
        validator:{
            validator: value=> validator.isStrongPassword(value),
            message: "Password Must be Contain letters digits and numbers"
        }
    }
},
{
    timestamps:true
})

UserSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    this.password= await bcrypt.hash(this.password, 10)
})

UserSchema.methods.ComparePassword=async function(givenPassword){
    return await bcrypt.compare(givenPassword, this.password)
}

const User=mongoose.model('User', UserSchema);

export default User;