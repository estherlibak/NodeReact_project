import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateNewApartment from './CreateNewApartment';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';



export default function MyApartments() {

    const [allApartments, setAllApartments] = useState([]);
    // const [updateApartment,setUpdategeApartment]=useState([])
    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddApartmentVisible, setIsAddApartmentVisible] = useState(false);


    const userId = useSelector((state) => state.token.user?._id); // קבלת מזהה המשתמש מהסטור

    useEffect(() => {
        if (userId) {
            fetchApartments(userId);
        }
    }, [userId]);
    const fetchApartments = async (id) => {
        await axios.get(`http://localhost:1100/api/apartment/user/${id}`)
            .then((response) => {
                setAllApartments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching apartments:', error);
            });

    };
    // פונקציה לעדכון דירה
    const handleUpdate = async (apartment) => {
        await axios.post(`http://localhost:1100/api/apartment/update/${apartment._id}`, apartment)
            .then((response) => {
                console.log('Apartment updated:', response.data);
                // עדכון רשימת הדירות לאחר ההצלחה
                setAllApartments((prevApartments) =>
                    prevApartments.map((apt) => (apt._id === apartment._id ? response.data : apt))
                );
            })
            .catch((error) => {
                console.error('Error updating apartment:', error);
            });
    }
    // פונקציה למחיקת דירה
    const handleDelete = async (apartment) => {
        await axios.delete(`http://localhost:1100/api/apartment/delete`, {
            data: { _id: apartment._id } // שליחת ה-_id בתוך data

        })
            .then((response) => {
                console.log('Apartment deleted:', response.data);
                // עדכון רשימת הדירות לאחר ההצלחה
                setAllApartments((prevApartments) =>
                    prevApartments.filter((apt) => apt._id !== apartment._id)
                );
            })
            .catch((error) => {
                console.error('Error deleting apartment:', error);
            });
    }


    return (

        <div className="card flex justify-content-center flex-wrap gap-3">
            {allApartments.length === 0 ? (
                <p>No apartments available.</p>
            ) : (

                allApartments.map((apartment) => (

                    <Card
                        key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                        title={`${apartment.city}`}
                        subTitle={`neighborhood: ${apartment.neighborhood || 'לא צוינה'}, street: ${apartment.street}, building: ${apartment.building}`}
                        footer={
                            <div className="flex justify-content-between">
                                <Button
                                    label="Details" icon="pi pi-info"
                                    onClick={() => {
                                        setSelectedApartment(apartment); // שמירת הדירה שנבחרה
                                        setIsModalVisible(true); // הצגת המודאל
                                    }}
                                />
                                <Button
                                    label="Update" className="p-button-secondary" icon="pi-pencil"
                                    onClick={() => handleUpdate(apartment)}
                                />
                                <Button label="Delete" icon="pi-trash" className="p-button-danger"
                                    onClick={() => handleDelete(apartment)}
                                />
                            </div>
                        }

                        className="md:w-25rem"
                    >

                    </Card>
                ))
            )}
            <Button label="Add Apartment" icon="pi pi-plus" onClick={() => setIsAddApartmentVisible(true)} />
            {isAddApartmentVisible && (
                <CreateNewApartment
                    onClose={() => setIsAddApartmentVisible(false)}
                />
            )}
        </div>


    )
}




