import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateNewApartment from './CreateNewApartment';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import UpdateApartment from './UpdateApartment';



export default function MyApartments() {

    const [allApartments, setAllApartments] = useState([]);
    // const [updateApartment,setUpdategeApartment]=useState([])
    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [apartment, setApartment] = useState();
    const [updateVisible, setUpdateVisible] = useState(false)

    const { token, user } = useSelector((state) => state.token); // קבלת הטוקן מה-Redux
    console.log('Token from Redux:', token);
    const userId = useSelector((state) => state.token.user?._id); // קבלת מזהה המשתמש מהסטור

    useEffect(() => {
        if (userId) {
            getApartments();
        }
    }, []);

    const getApartments = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1100/api/apartment/user/${userId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setAllApartments(data);
            console.log(data);
        }

        catch (error) {
            console.error('Error fetching apartments:', error);
        }

    };
    // פונקציה לעדכון דירה
    // const handleUpdate = async (apartment) => {
    //     await axios.post(`http://localhost:1100/api/apartment/update/${apartment._id}`, apartment)
    //         .then((response) => {
    //             console.log('Apartment updated:', response.data);
    //             // עדכון רשימת הדירות לאחר ההצלחה
    //             setAllApartments((prevApartments) =>
    //                 prevApartments.map((apt) => (apt._id === apartment._id ? response.data : apt))
    //             );
    //         })
    //         .catch((error) => {
    //             console.error('Error updating apartment:', error);
    //         });
    // }
    // פונקציה למחיקת דירה
    const handleDelete = async (apartmentId) => {
        try {
            console.log(token);

            const { data2 } = await axios.delete(`http://localhost:1100/api/myApartments/${apartmentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            alert('Apartment deleted:', data2);
            // עדכון רשימת הדירות לאחר ההצלחה
            getApartments();
            // setAllApartments((prevApartments) =>
            //     prevApartments.filter((apartment) => apartment._id !== apartmentId)
            // );

        }
        catch (error) {
            console.error('Error deleting apartment:', error);
        };
    }


    return (

        <div className="card flex justify-content-center flex-wrap gap-3">
            <CreateNewApartment getApartments={getApartments} />
            <UpdateApartment apartment={apartment} onClose={setUpdateVisible} updateVisible={updateVisible} setUpdateVisible={setUpdateVisible} getApartments={getApartments} />
            {allApartments.length === 0 ? (
                <p>No apartments available.</p>
            ) : (

                allApartments.map((apartment) => (

                    <Card
                        key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                        title={`${apartment.city}`}
                        subTitle={`neighborhood: ${apartment.neighborhood || 'לא צוינה'}, street: ${apartment.street}, building: ${apartment.building}`}
                        footer={
                            <div className="flex justify-content-between gap-2">
                                <Button label="Details" icon="pi pi-info"
                                    onClick={() => { setSelectedApartment(apartment); setIsModalVisible(true) }} />
                                <Button label="Update" icon="pi pi-pencil" className="p-button-info"
                                    onClick={() => (setApartment(apartment),setUpdateVisible(true))} />
                                <Button label="Delete" icon="pi pi-trash" className="p-button-danger"
                                    onClick={() => handleDelete(apartment._id)} />
                            </div>
                        }

                        className="md:w-25rem"
                    >

                    </Card>
                ))
            )}
            {/* <Button label="Add Apartment" icon="pi pi-plus" onClick={() => setIsAddApartmentVisible(true)} />
            {isAddApartmentVisible && (
                <CreateNewApartment
                    onClose={() => setIsAddApartmentVisible(false)}
                />
            )} */}

            {/* מודאל להצגת פרטי הדירה */}
            <Dialog
                header={`Details: ${selectedApartment?.city || ''}`}
                visible={isModalVisible}
                style={{ width: '50vw' }}
                onHide={() => setIsModalVisible(false)}
            >
                {selectedApartment && (
                    <div>
                        <p><strong>neighborhood:</strong> {selectedApartment.neighborhood || 'לא צוינה'}</p>
                        <p><strong>street:</strong> {selectedApartment.street}, number: {selectedApartment.building}</p>
                        <p><strong>price:</strong> {selectedApartment.price} ₪</p>
                        <p><strong>size:</strong> {selectedApartment.size} מ"ר</p>
                        <p><strong>numOfRooms:</strong> {selectedApartment.numOfRooms}</p>
                        <p><strong>airDirections:</strong> {selectedApartment.airDirections}</p>
                        <p><strong>options:</strong> {selectedApartment.options.join(', ')}</p>
                        <p><strong>discreption:</strong> {selectedApartment.discreption}</p>
                    </div>
                )}
            </Dialog>
        </div>


    )
}




