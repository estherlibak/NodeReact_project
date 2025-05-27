
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import axios from "axios";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";


const CreateNewApartment = ({ getApartments }) => {


    // const [visible, setVisible] = useState(false)
    const [visible, setVisible] = useState(false);

    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [description, setDescription] = useState('');
    const [airDirections, setAirDirections] = useState('');
    const [options, setOptions] = useState('');

    const { token, role, user } = useSelector((state) => state.token);

    const userId = useSelector((state) => state.token.user?._id); // קבלת מזהה המשתמש מהסטור
    const addApartment = async () => {
        const apartmentData = {
            user: userId,
            city,
            neighborhood,
            street,
            building,
            floor,
            price,
            size,
            numOfRooms: numberOfRooms,
            discreption: description,
            airDirections: airDirections,
            options: options
            // img: img ? img.spliit(',') : []


        }
        try {
            const { data } = await axios.post('http://localhost:1100/api/apartment/', apartmentData,
                { headers: { Authorization: `Bearer ${token}` } }

            )
            console.log('Apartment added:', data);
            resetFields(); // איפוס השדות לאחר ההצלחה
            getApartments();
            setVisible(false); // סגירת הדיאלוג לאחר ההצלחה
            alert('Apartment added successfully!');
        }
        catch (error) {
            console.error('Error adding apartment:', error);
            alert(error.response?.data?.message || 'Failed to add apartment. Please try again.');
        };
        // <CreateNewApartment/>

    }


    const resetFields = () => {
        setCity('');
        setNeighborhood('') // ניהול השכונה
        setStreet(''); // ניהול שם הרחוב
        setBuilding(''); // ניהול שם הבניין
        setFloor(''); // ניהול הקומה
        setPrice(''); // ניהול מחיר הדירה
        setSize('') // ניהול גודל הדירה
        setNumberOfRooms('') // ניהול מספר החדרים
        setDescription(''); // ניהול תיאור הדירה
        setAirDirections('') // ניהול כיווני האוויר
        setOptions('') // ניהול אפשרויות נוסxxx
    }



    return (
        <div className="card flex justify-content-center">
            <Button label="Add Apartment" icon="pi-pi-home" onClick={() => setVisible(true)} />
            <Dialog
                header="Add New Apartment"
                visible={visible}
                modal
                onHide={() => {
                    resetFields(); // איפוס השדות כאשר הדיאלוג נסגר
                    setVisible(false)
                }}

            >

                <div className="flex flex-column gap-3">


                    <div className="flex flex-column gap-2">
                        <label htmlFor="city">City</label>
                        <InputText
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="neighborhood">Neighborhood</label>
                        <InputText
                            id="neighborhood"
                            type="text"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="street">Street</label>
                        <InputText
                            id="street"
                            type="text"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="building">Building</label>
                        <InputText
                            id="building"
                            type="text"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="floor">Floor</label>
                        <InputText
                            id="floor"
                            type="text"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="price">Price</label>
                        <InputText
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="size">Size</label>
                        <InputText
                            id="size"
                            type="number"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="numberOfRooms">Number of Rooms</label>
                        <InputText
                            id="numberOfRooms"
                            type="number"
                            value={numberOfRooms}
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="description">Description</label>
                        <InputText
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="airDirections">Air Directions</label>
                        <InputText
                            id="airDirections"
                            type="text"
                            value={airDirections}
                            onChange={(e) => setAirDirections(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="options">Options</label>
                        <InputText
                            id="options"
                            type="text"
                            value={options}
                            onChange={(e) => setOptions(e.target.value.split(','))}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-content-between">
                        <Button label="save" onClick={addApartment} />
                        <Button label="cancel" onClick={() => setVisible(false)} />
                    </div>
                </div>

            </Dialog >
        </div >
    )
}


export default CreateNewApartment;
