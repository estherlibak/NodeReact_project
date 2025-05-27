import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import MyApartments from './MyApartments';

export default function MyFavorite(apartment) {
    console.log('Adding to favorites:', apartment);

    const [allApartments, setAllApartments] = useState([])
    // const [apartment, setApartment] = useState();
    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)



    const { token, role, user } = useSelector((state) => state.token);
    const userId = useSelector((state) => state.token.user?._id)

    useEffect(() => {
        if (userId)
            getMyFavoriteApartments()
    }, [])

    const getMyFavoriteApartments = async () => {

        try {
            const { data } = await axios.get(`http://localhost:1100/api/myapartments`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('favoriteApartment added:', data);
            setAllApartments(data);


        }
        catch (error) {
            console.log('Error fetching favorite apartments:', error);
            alert(error.response?.data?.message || 'Failed to fetch favorite apartments. Please try again.');
        }
    }
    const deleteMyFavorite = async (aprtmentId) => {
        try {
            const { data } = await axios.delete(`http://localhost:1100/api/myapartments/${aprtmentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            alert('favorite Apartment deleted:', data);
            getMyFavoriteApartments()
        } catch (error) {
            console.log('Error deleting favorite apartment:', error)
        }
    }


    return (
        <div className="card flex justify-content-center flex-wrap gap-3">
            {allApartments?.length === 0 ? (
                <p>No favorite apartments.</p>
            ) : (
                allApartments?.map((apartment) => (

                    <Card
                        key={apartment.apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                        title={`${apartment.apartment.city}`}
                        subTitle={`neighborhood: ${apartment.apartment.neighborhood || 'לא צוינה'}, street: ${apartment.apartment.street}, building: ${apartment.apartment.building}`}
                        footer={
                            <div className="flex justify-content-between">
                                <Button label="Details" icon="pi pi-info"
                                    onClick={() => { setSelectedApartment(apartment.apartment); setIsModalVisible(true) }} />
                                <Button onClick={() => deleteMyFavorite(apartment._id)} icon="pi pi-heart" rounded text severity="help" aria-label="Favorite"  style={{ color: "red" }} />

                            </div>
                        }


                        className="md:w-25rem"
                    >

                    </Card>
                ))
            )}
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
    );
}