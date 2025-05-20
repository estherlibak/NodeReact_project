import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';

import 'primeicons/primeicons.css';


export default function MyApartments() {

    const [allApartments, setAllApartments] = useState([]);
    // const [updateApartment,setUpdategeApartment]=useState([])
    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        fetchApartments();
    }, []);
    const fetchApartments = () => {
        axios.get('http://localhost:1100/api/apartment/user/327607099')
            .then((response) => {
                setAllApartments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching apartments:', error);
            });

    };
    // פונקציה לעדכון דירה
    const handleUpdate = (apartment) => {
        axios.post(`http://localhost:1100/api/apartment/update/${apartment._id}`, apartment)
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
    const handleDelete = (apartment) => {
        axios.delete(`http://localhost:1100/api/apartment/delete/${apartment._id}`)
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
                                    label="Details"
                                    icon="pi pi-info"
                                    onClick={() => {
                                        setSelectedApartment(apartment); // שמירת הדירה שנבחרה
                                        setIsModalVisible(true); // הצגת המודאל
                                    }}
                                />
                                <Button
                                    label="Update"
                                    className="p-button-secondary"
                                    icon="pi-pencil"
                                    onClick={() => handleUpdate(apartment)}
                                />
                                <Button
                                    label="Delete"
                                    icon="pi-trash"
                                    className="p-button-danger"
                                    onClick={() => handleDelete(apartment._id)}
                                />
                            </div>
                        }

                        className="md:w-25rem"
                    >

                    </Card>
                ))
            )}

        </div>
    )
}




