
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


export default function UpdateApartment({ apartment, onClose, updateVisible, setUpdateVisible, getApartments }) {


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
    const update = async () => {
        const apartmentData = {
            _id: apartment._id, // הוספת מזהה הדירה לעדכון
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
            options,


        }
        // useEffect(() => {
        //     updateApartment();
        // }, [])


        try {
            await axios.put('http://localhost:1100/api/apartment', apartmentData,
                { headers: { Authorization: `Bearer ${token}` } }

            )
            setUpdateVisible(false)
            getApartments()
            alert('Apartment updated successfully!');
        }
        catch (error) {
            console.error('Error updatin apartment:', error);
            alert(error.data?.message || 'Failed to update apartment. Please try again.');


        }



        // .then((response) => {
        //     console.log('Apartment added:', response.data);
        //     resetFields(); // איפוס השדות לאחר ההצלחה
        //     onClose()
        //     alert('Apartment added successfully!');

        // })
        // .catch((error) => {
        //     console.error('Error adding apartment:', error);
        //     alert(error.response?.data?.message || 'Failed to add apartment. Please try again.');
        // });
        //  <CreateNewApartment/>

    }
    useEffect(() => {
        console.log("apartment", apartment);

        if (apartment) {

            setCity(apartment.city || '');
            setNeighborhood(apartment.neighborhood || '') // ניהול השכונה
            setStreet(apartment.street || ''); // ניהול שם הרחוב
            setBuilding(apartment.building || ''); // ניהול שם הבניין
            setFloor(apartment.floor || ''); // ניהול הקומה
            setPrice(apartment.price || ''); // ניהול מחיר הדירה
            setSize(apartment.size || '') // ניהול גודל הדירה
            setNumberOfRooms(apartment.numOfRooms || '') // ניהול מספר החדרים
            setDescription(apartment.description || ''); // ניהול תיאור הדירה
            setAirDirections(apartment.airDirections || '') // ניהול כיווני האוויר
            setOptions(apartment.options || '') // ניהול אפשרויות נוסxxx

        }
    }, [apartment])

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
            <Card title="Add New Apartment" className="md:w-25rem">
                <Dialog
                    header="Update Apartment"
                    visible={updateVisible}
                    modal
                    onHide={() => {
                        resetFields(); // איפוס השדות כאשר הדיאלוג נסגר
                        onClose(false); // סגירת הדיאלוג
                    }}
                >
                    <div className="flex flex-column gap-3">
                        <h2>Add New Apartment</h2>

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="city">City</label>
                            <InputText id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full"/>
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="neighborhood">Neighborhood</label>
                            <InputText id="neighborhood" type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="w-full"
                            />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="street">Street</label>
                            <InputText id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="building">Building</label>
                            <InputText id="building" type="text" value={building} onChange={(e) => setBuilding(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="floor">Floor</label>
                            <InputText id="floor" type="text" value={floor} onChange={(e) => setFloor(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="price">Price</label>
                            <InputText id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)}  className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="size">Size</label>
                            <InputText id="size" type="number" value={size} onChange={(e) => setSize(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="numberOfRooms">Number of Rooms</label>
                            <InputText id="numberOfRooms" type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="description">Description</label>
                            <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="airDirections">Air Directions</label>
                            <InputText
                                id="airDirections" type="text" value={airDirections} onChange={(e) => setAirDirections(e.target.value)} className="w-full" />
                        {/* </div> */}

                        {/* <div className="flex flex-column gap-2"> */}
                            <label htmlFor="options">Options</label>
                            <InputText id="options" type="text" value={options} onChange={(e) => setOptions(e.target.value.split(','))} className="w-full" />
                        {/* </div> */}

                        <div className="flex justify-content-between">
                            {/* <button onClick={()=>} type="button" className="p-button p-component p-button-primary"> */}
                                {/* <span className="p-button-label">update Apartment</span>
                            </button> */}
                            <button onClick={() => setUpdateVisible(false)} className="p-button p-component p-button-secondary">
                                <span className="p-button-label">cancel</span>
                            </button>
                        </div>
                    </div>
                </Dialog >
            </Card >
        </div >
    )
}



