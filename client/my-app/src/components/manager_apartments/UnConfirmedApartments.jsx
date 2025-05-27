import { Dialog } from 'primereact/dialog';


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux'
export default function AllApartments() {
    const [allApartments, setAllApartments] = useState([]);
    const [apartment, setApartment] = useState();

    const [selectedApartment, setSelectedApartment] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { token, role, user } = useSelector((state) => state.token);
    const getApartments = async () => {
        try {
            const { data } = await axios.get('http://localhost:1100/api/apartment/unConfirmed',
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

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []);





    // const formatCurrency = (value) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // };

    // const imageBodyTemplate = (product) => {
    //     return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
    // };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    const footer = `In total there are ${allApartments ? allApartments.length : 0} apartments.`;

    return (
        <div className="card">
            <DataTable value={allApartments} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field='user' header="user"></Column>
                <Column field="city" header="Name"></Column>
                <Column field="nighberhood" header="Name"></Column>
                <Column field="price" header="price"></Column>
                <Column field="size" header="size"></Column>
                {/* <Column header="img" body={imageBodyTemplate}></Column> */}

            </DataTable>
        </div>
    );
}
