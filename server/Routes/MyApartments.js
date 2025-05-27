const express=require('express')
const router=express.Router();
const verifyJWT=require("../middleWare/varifyJWT")
const  apartmentController=require('../Controller/MyAparymentsController')


router.post('/',apartmentController.createMyApartment)
router.get('/',apartmentController.getAllMyApartments)
router.get('/:id',apartmentController.getAllMyApartmentsId)
router.delete('/:_id',verifyJWT,apartmentController.deleteMyApartment)

router.use(verifyJWT)


router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

module.exports=router
