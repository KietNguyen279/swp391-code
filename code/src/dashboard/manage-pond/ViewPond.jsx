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
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
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
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (size) => size ? `${size} cm` : 'N/A' // Display size in cm
        },
        {
            title: 'Depth',
            dataIndex: 'depth',
            key: 'depth',
            render: (depth) => depth ? `${depth} m` : 'N/A' // Display depth in meters
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            render: (volume) => volume ? `${volume} L` : 'N/A' // Display volume in liters
        },
        {
            title: 'Number of Drains',
            dataIndex: 'num_of_drains',
            key: 'num_of_drains',
            render: (num) => num || 'N/A' // Display 'N/A' if num_of_drains is 0
        },
        {
            title: 'Pump Capacity',
            dataIndex: 'pump_capacity',
            key: 'pump_capacity',
            render: (capacity) => capacity ? `${capacity} L/h` : 'N/A' // Display capacity in liters per hour
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (userId) => userId || 'N/A' // Display 'N/A' if user_id is 0
        },
        {
            title: 'Salt (kg) Required',
            dataIndex: 'salt_kg_required',
            key: 'salt_kg_required',
            render: (salt) => salt ? `${salt} kg` : 'N/A' // Display salt in kg
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note'
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