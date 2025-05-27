const MyApartment = require("../Modeles/MyApartments")

// יצירת רשומה חדשה ב-MyApartments
const createMyApartment = async (req, res) => {
    console.log("user.id");
    try {
        const { user, apartment } = req.body;
        console.log(user,apartment)
        if (!user || !apartment) {
            return res.status(400).json({ message: 'user and apartment are required' });
        }
        // בדיקה אם הדירה כבר קיימת למשתמש
        const myApartments = await MyApartment.findOne({ user: user, apartment: apartment });
        if (myApartments) {
            return res.status(401).json({ message: 'Apartment already exists for this user' });
        }
        const myApartment = await MyApartment.create({ user, apartment }); // כאן השינוי - שם נכון

        res.status(201).json(myApartment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// קבלת כל דירות המשתמש
const getAllMyApartments = async (req, res) => {
    try {
        const myApartments = await MyApartment.find().populate('apartment user');
        res.json(myApartments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllMyApartmentsId = async (req, res) => {
    const { id } = req.params
    const myApartments = await MyApartment.find({ user: id }).lean()
    if (!myApartments)
        return res.status(400).json({ message: 'apartment not found' })
    res.json(myApartments)
}

const deleteMyApartment = async (req, res) => {
    const { _id } = req.params;
    console.log("deleteMyApartment",_id);
    try {
        const myApartment = await MyApartment.findById(_id).exec();
        console.log(myApartment,_id);
        if (!myApartment) {
            return res.status(404).json({ message: 'MyApartment not found' });
        }
        await MyApartment.deleteOne( {_id} );
        res.json({ message: 'MyApartment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getAllMyApartmentsId, createMyApartment, deleteMyApartment,getAllMyApartments };