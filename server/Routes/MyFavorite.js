const express=require('express')
const router=express.Router()
const verifyJWT=require("../middleWare/varifyJWT")
const managerJWT = require('../middleWare/managerJWT');

const MyFavoriteController=require("../Controller/MyFavorite")

router.get("/", verifyJWT, MyFavoriteController.getAllMyFavorites)
router.get("/:_id", verifyJWT, MyFavoriteController.getMyFavoriteById)
router.post("/", verifyJWT, MyFavoriteController.createNewMyFavorite)
// router.put("/", verifyJWT, MyFavoriteController.updateMyFavorite)
router.delete("/:_id", verifyJWT, MyFavoriteController.deleteMyFavorate)



router.use(verifyJWT)


router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

router.get('/manager-only', verifyJWT, managerJWT, (req, res) => {
    res.json({ message: `Hello Manager, ${req.user.name}` });
});


module.exports=router