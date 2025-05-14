import userModel from "../models/user.js"

const getUsers = async(req,res)=>{

    const users = await userModel.find();

    res.json(users);
}

const getUserById = async(req,res)=>{
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user);
}

const createUser = async(req,res)=>{
    const data = req.body;
    console.log("data",data);
    const newUser = new userModel(data);
    await newUser.save();
    res.json(newUser);
}

const updateUser = async(req,res)=>{
    const data = req.body;
    console.log("data",data);
    const id = req.params.id;
    console.log("id",id);
    const updatedUser = await userModel.findByIdAndUpdate(id,data);
    res.json(updatedUser);
}

const deleteUser = async(req,res)=>{
    const id = req.params.id;
    console.log("id",id);
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.json(deletedUser);
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};