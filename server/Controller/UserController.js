const User=require('../Modeles/User')
const Apartment=require('../Modeles/Apartment')

const createNewUser=async(req,res)=>{
    console.log("createNewUser");
    const{ name,username,password,phone,email,roles}=req.body
    if(!name||!username||!phone||!email||!password)
        return res.status(400).json({message:'name,phone,mail,password, address are required'})
    try{
    const user=await User.create({
        name,
        username,
        password,
        phone,
        email,
        roles})
    
    if(user)
        return res.status(201).json({message:'new user created'})
    else
        return res.status(400).json({message:'invalid user'})
}catch (error) {
    if (error.code === 11000) { // שגיאה של שדה ייחודי
        return res.status(400).json({ message: 'Username or email already exists' });
    }
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
}
const getAllUsers=async(req,res)=>{
    const users =await User.find().sort({name:1}).lean()
    if(!users?.length)
        return res.status(400).json({message:'no user found'})
    res.json(users)
}
const updateUser=async(req,res)=>{
    const{_id,name,username,password,phone,mail,roles}=req.body
    if(!_id||!(name||username||phone||mail||password))
        return res.status(400).json({message:'fields are required'})
    const user =await User.findById(_id).exec()
    if(!user)
        return res.status(400).json({message:'user not found'})
    user.name=name
    user.username=username
    user.password=password
    user.phone=phone
    user.email=email
    user.roles=roles
    await user.save()
    res.json(`'${user.name}`)
}
const deleteUser=async(req,res)=>{
    const{_id}=req.body
    if(!_id)
        return res.status(400).json({message:'please inter id'})
    const user=await User.findById(_id).exec()
    
    if(!user)
        return res.status(400).json({message:'user not found'})
    // בדיקה אם למשתמש יש דירות
    const userApartments = await Apartment.find({ user: _id }).lean();
    if (userApartments.length > 0) {
        return res.status(400).json({ message: 'Cannot delete user with existing apartments' });
    }    
    await User.deleteOne()
    res.json({message:`User '${user.name}deleted`})
}
const getUserById=async (req,res)=>{
    const{_id}=req.params
    if(!_id)
        return res.status(400).json({message:'please inter id'})
    const user=await User.findById(_id).lean()
    if(!user)
        return res.status(400).json({message:'user not found'})
    res.json(user)
}


module.exports={
    createNewUser,
    getAllUsers,
    getUserById,
     deleteUser,
    updateUser}