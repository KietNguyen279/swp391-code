import { Button, Image, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlice";
import api from "../../config/axios";
import { toast } from "react-toastify";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";

function CartPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      render: (img) => {
        return <Image src={img} width="200px"></Image>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "description",
      dataIndex: "description",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "price",
      dataIndex: "price",
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const handleBuy = async () => {
    //from id, take product info
    try {
      const koiProductBought = data.filter((koiProduct) =>
        selectedRowKeys.includes(koiProduct.id)
      );

      const items = koiProductBought.map((koiProduct) => ({
        product_id: koiProduct.id,
        quantity: koiProduct.quantity,
        price: koiProduct.price * koiProduct.quantity,
      }));
      console.log(items);
      const response = await api.post("order", { items });
      console.log(response.data);
      window.open(response.data);
      toast.success("buy successfull");
    } catch (error) {
      toast.error("error");
    }
  };

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
