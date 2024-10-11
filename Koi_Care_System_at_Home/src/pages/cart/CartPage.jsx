import { Button, Image, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlice";
import api from "../../config/axios";
import { toast } from "react-toastify";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";

function CartPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleBuy = async () => {
    try {
      // từ id con cá trong redux lấy ra con cá
      const selectedItems = data.filter((koi) =>
        selectedRowKeys.includes(koi.id)
      );
      const detail = selectedItems.map((koi) => ({
        koiId: koi.id,
        quantity: koi.quantity,
      }));
      // call API
      const response = await api.post("/order", { detail });
      dispatch(clearAll());
      toast.success("ok hehe");
    } catch (error) {
      toast.error("fail to create order");
    }
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <Image src={image} width="200px" />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  return (
    <div>
      <LayoutTemplate>
        <div
          style={{
            padding: "60px",
          }}
        >
          <Button onClick={() => dispatch(clearAll())}>Clear All</Button>
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
          <Button onClick={handleBuy}>Buy</Button>
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default CartPage;
