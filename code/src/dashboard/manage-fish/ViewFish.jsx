import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { fetchFishData } from '../../config/ApiFish.jsx';

const FishTable = () => {
    const [fishData, setFishData] = useState([]);

    useEffect(() => {
        const loadFishData = async () => {
            try {
                const data = await fetchFishData();
                setFishData(data);
            } catch (error) {
                console.error('Error fetching fish data:', error);
            }
        };

        loadFishData();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="Fish" style={{ maxWidth: '100px' }} />
        },
        {
            title: 'Body Shape',
            dataIndex: 'body_shape',
            key: 'body_shape'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (age) => age || 'N/A' // Display 'N/A' if age is 0
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => size ? `${size} cm` : 'N/A' // Display size in cm
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (weight) => weight ? `${weight} kg` : 'N/A' // Display weight in kg
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Breed',
            dataIndex: 'breed',
            key: 'breed'
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin'
        },
        {
            title: 'Food',
            dataIndex: 'food_required_kg_per_day',
            key: 'food_required_kg_per_day'
        },
        {
            title: 'Pond ID',
            dataIndex: 'pond_id',
            key: 'pond_id',
            render: (pondId) => pondId || 'N/A' // Display 'N/A' if pond_id is 0
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Fish List</h2>
            <Table dataSource={fishData} columns={columns} pagination={false} />
        </div>
    );
};

export default FishTable;