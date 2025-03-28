import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
        validator: validator.isEmail,
        message : "Please provide valid email",
    }
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
});

UserSchema.pre("save" , async function(next){
  
  if(!this.isModified("password")){
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);


})

UserSchema.methods.comparePassword = async function(password){
  const isMatch = await bcrypt.compare(password , this.password);
  return isMatch;
}

const User = mongoose.model("User", UserSchema);
export default User;