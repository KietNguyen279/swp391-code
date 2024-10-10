import React from "react";
import CRUDTemplate from "../../../components/CRUD-template/CRUDTemplate";
import { Form, Input } from "antd";

function ManageUser() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
    },
  ];
  const formItems = (
    <>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item></Form.Item>
    </>
  );
  return (
    <div>
      <CRUDTemplate
        columns={columns}
        formItems={formItems}
        path="usermanager"
      />
    </div>
  );
}

export default ManageUser;
