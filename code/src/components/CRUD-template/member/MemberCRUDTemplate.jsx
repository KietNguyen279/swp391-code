import { Button, Form, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/axios";

function MemberCRUDTemplate({ columns, formItems, path }) {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  //   const tableColumn = [
  //     ...columns,
  //     {
  //       title: "Action",
  //       dataIndex: "id",
  //       key: "id",
  //       render: (id, category) => (
  //         <>
  //           <Button
  //             type="primary"
  //             onClick={() => {
  //               setShowModal(true);
  //               form.setFieldsValue(category);
  //             }}
  //           >
  //             Edit
  //           </Button>
  //           <Popconfirm
  //             title="Delete"
  //             description="Do you want to delete this category?"
  //             onConfirm={() => handleDelete(id)}
  //           >
  //             <Button type="primary" danger>
  //               Delete
  //             </Button>
  //           </Popconfirm>
  //         </>
  //       ),
  //     },
  //   ];

  //GET
  const fetchData = async () => {
    try {
      const response = await api.get(path);
      setData(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  //CREATE OR UPDATE
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      if (values.id) {
        // --> update
        const response = await api.put(`${path}/${values.id}`, values);
      } else {
        // --> create
        const response = await api.post(path, values);
      }
      const response = await api.post(path, values);
      toast.success("Successfully saved");
      fetchData();
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`${path}/${id}`);
      toast.success("Delete successfull");
      fetchData();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Button
        style={{ backgroundColor: "#ff6900", color: "#fff" }}
        onClick={() => setShowModal(true)}
      >
        Add
      </Button>
      {/* This is contents */}

      {/* This is the end of the contents */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          {formItems}
        </Form>
      </Modal>
    </div>
  );
}

export default MemberCRUDTemplate;
