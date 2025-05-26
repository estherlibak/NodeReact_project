import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux'
import MyFavorite from './myFavorite/MyFavoriteApartment';

export default function AllApartments() {
    const [allApartments, setAllApartments] = useState([]);
    const [apartment, setApartment] = useState();

    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { token, role, user } = useSelector((state) => state.token);
    const getApartments = async () => {
        try {
            const { data } = await axios.get('http://localhost:1100/api/apartment',
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setAllApartments(data);
            console.log(data);
        }
        catch (error) {
            console.error('Error fetching apartments:', error);
        }
    }


    useEffect(() => {
        getApartments();

    }, [])
    return (

        <div className="card flex justify-content-center flex-wrap gap-3">
            <MyFavorite apartment={apartment} />
            {allApartments && allApartments.map(apartment => (

                <Card
                    key={apartment._id} // ודא שלכל דירה יש מזהה ייחודי
                    title={`${apartment.city}`}
                    subTitle={`neighborhood: ${apartment.neighborhood || 'לא צוינה'}, street: ${apartment.street}, building: ${apartment.building}`}
                    footer={
                        <div className="flex justify-content-between">
                            <Button onClick={() => MyFavorite(apartment)} icon="pi pi-heart" rounded text severity="help" aria-label="Favorite" />

                            <Button
                                label="Details"
                                icon="pi pi-info"
                                onClick={() => {
                                    setSelectedApartment(apartment); // שמירת הדירה שנבחרה
                                    setIsModalVisible(true); // הצגת המודאל
                                }}
                            />
                            <Button
                                label="Contact"
                                severity="secondary"
                                icon="pi pi-envelope"
                                onClick={() => alert(`צור קשר עם המשתמש: ${apartment.user}`)}
                            />
                        </div>
                    }

                    className="md:w-25rem"
                >

                </Card>
            ))}

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
