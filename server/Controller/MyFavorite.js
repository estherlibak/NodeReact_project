const MyFavorite = require('../Modeles/User')
const Apartment = require('../Modeles/Apartment');
const { model } = require('mongoose');

const createNewMyFavorite = async (req, res) => {
    console.log("createNewFavorate");
    const { myApartments, myFavorite } = req.body
    if (!myApartments)
        return res.status(400).json({ message: 'myApartments are required' })

    const favorite = await MyFavorite.create({
        myApartments,
        myFavorite
    })

    if (favorite)
        return res.status(201).json({ message: 'new favorite created' })
    else
        return res.status(400).json({ message: 'invalid favorite' })
}
const getAllMyFavorites = async (req, res) => {
    const favorite = await MyFavorite.find().sort({ name: 1 }).lean()
    if (!favorite?.length)
        return res.status(400).json({ message: 'no favorite found' })
    res.json(users)
}
// const updateFavorite = async (req, res) => {
//     const { _id, myApartments, myFavorite } = req.body
//     if (!_id || !myApartments)
//         return res.status(400).json({ message: 'fields are required' })
//     const favorite = await MyFavorite.findById(_id).exec()
//     if (!favorite)
//         return res.status(400).json({ message: 'favorite not found' })
//     favorite.myApartments = myApartments
//     favorite.myFavorite = myFavorite
//     await favorite.save()
//     res.json(`'${favorite.myApartments} 'updated`)
// }
const deleteMyFavorate = async (req, res) => {
    const { _id } = req.body
    if (!_id)
        return res.status(400).json({ message: 'please inter id' })
    const favorite = await MyFavorite.findById(_id).exec()

    if (!favorite)
        return res.status(400).json({ message: 'favorite not found' })
    await MyFavorite.deleteOne()
    res.json({ message: `User '${favorite.Apartment}deleted` })
}
const getMyFavoriteById = async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).json({ message: 'please inter id' })
    const user = await MyFavorite.findById(_id).lean()
    if (!user)
        return res.status(400).json({ message: 'user not found' })
    res.json(user)
}


module.exports = {
   createNewMyFavorite,
   getAllMyFavorites,
   deleteMyFavorate,
   getMyFavoriteById,
}