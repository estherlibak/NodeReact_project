const Apartment = require('../Modeles/Apartment')
const User = require('../Modeles/User')

const { populate } = require('../Modeles/User')
const { createNewUser } = require("./UserController")

//הוספת דירה חדשה
const createNewApartment = async (req, res) => {
    const { user, city, neighborhood, street, building, floor, price, img, size, numOfRooms, airDirections, discreption, options } = req.body
   
   console.log( user, city, neighborhood, street, building, floor, price, size, numOfRooms, airDirections, discreption, options )
    if (!user || !city || !neighborhood || !street || !building || !floor || !price || !size || !numOfRooms || !airDirections || !discreption || !options)
        return res.status(400).json({ message: 'Missing required fields' })


    const parsedUser = await User.findById({ _id: user })
    // const newUser = await createNewUser(parsedUser);
    if (!parsedUser)
        return res.status(400).send("User is not exists")
    const apartment = await Apartment.create({
        user,
        city,
        neighborhood,
        street,
        building,
        floor,
        price,
        img,
        size,
        numOfRooms,
        airDirections,
        discreption,
        options,
        isConfirm: false,
        purchaseConfirm: false
    });

    if (apartment) {
        return res.status(201).json({ message: 'new apartment created' })
    } else {
        return res.status(400).json({ message: 'invalid apartment' })
    }

}
//אישור דירה
const logInApartment = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    apartment.isConfirm = true
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}
//אישור קניה דירה
const ApartmentConfirm = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
        apartment.purchaseConfirm = true
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}
//אישור קניה דירה
const deletConfirmedApartment = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
        apartment.purchaseConfirm = true
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}




//תצוגת כל הדירות המאושרותת
const getAllApartments = async (req, res) => {
    const apartment = await Apartment.find({ isConfirm: true }).lean()
    if (!apartment?.length) {
        return res.status(400).json({ message: 'No apartment found' })
    }
    res.json(apartment)
}

//תצוגת כל הדירות המאושרותת
const getUnConfirmedApartments = async (req, res) => {
    const apartment = await Apartment.find({ isConfirm: false }).lean()
    if (!apartment?.length) {
        return res.status(400).json({ message: 'No apartment found' })
    }
    res.json(apartment)
}
const updateApartment = async (req, res) => {
    const { _id, user, city, neighborhood, street, building, floor, price, img, size, numOfRooms, airDirections, discreption, options } = req.body
    if (!_id || (!user || !city || !neighborhood || !street || !building || !floor || !price || !size || !numOfRooms || !airDirections || !discreption || !options))
        return res.status(400).json({ message: 'feild is required' })
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not fount' })
    
    // בדיקה אם המשתמש הוא הבעלים של הדירה
    if (apartment.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
    }
    apartment.user = user
    apartment.city = city
    apartment.neighborhood = neighborhood
    apartment.street = street
    apartment.building = building
    apartment.floor = floor
    apartment.price = price
    apartment.img = img
    apartment.size = size
    apartment.numOfRooms = numOfRooms
    apartment.airDirections = airDirections
    apartment.discreption = discreption
    apartment.options = options
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}
const deleteApartment = async (req, res) => {
    console.log(req.params)
    const { _id } = req.params

    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }


    const apartment = await Apartment.findById(_id).exec()
    console.log(apartment)
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })

    if (apartment.user.toString() !== req.user._id&&'Manager'==!req.user.roles) {
        return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
    }
    var a=await Apartment.deleteOne({ _id })
    console.log(a)
    // res.json({ message: `Apartment '${_id}' deleted successfully` });
}
// const deleteApartment = async (req, res) => {
//     const { _id } = req.body
//     if (!_id) {
//         return res.status(400).json({ message: 'Apartment ID is required' });
//     }
//     // בדיקה אם הדירה קיימת
//     const apartment = await Apartment.findById(_id).exec()
//     if (!apartment)
//         return res.status(400).json({ message: 'apartment not found' })
    
//     if (apartment.user.toString() !== req.user._id) {
//         return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
//     }
//     await Apartment.deleteOne({ _id })
//     res.json({ message: `Apartment '${_id}' deleted successfully` });
// }

//תצוגת הדירות רק שלי
const getApartmentByUserId = async (req, res) => {
    const { id } = req.params
    const apartment = await Apartment.find({ user: id }).lean()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    res.json(apartment)
}

//פרטי בעל הדירה
const getApartmentById = async (req, res) => {
    const { id } = req.params
    const apartment = await Apartment.find({ user: id })
        .populate('user')
        .lean();
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    res.json(apartment)
}

module.exports = {
    createNewApartment,
    getApartmentById,
    getAllApartments,
    getApartmentByUserId,
    updateApartment,
    // deleteMyApartment,
    ApartmentConfirm,
    logInApartment,
    deleteApartment,
    getUnConfirmedApartments,
    deletConfirmedApartment
}