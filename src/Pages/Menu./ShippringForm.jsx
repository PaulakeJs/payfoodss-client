import React from "react";
import { Form, Input, Select, Radio, Button } from "antd";
import { useSelector } from "react-redux";

const ShippingForm = ({ shippingInfo, setShippingInfo, uploadInfo }) => {
  const { user } = useSelector((state) => state.users);
  const rules = [
    {
      required: true,
      message: "This field is required",
    },
  ];

  // Custom rule to validate phone number
  const validatePhoneNumber = (rule, value) => {
    if (!value) {
      return Promise.reject("Please enter your phone number");
    } else if (!/^\d{10}$/.test(value)) {
      return Promise.reject("Please enter a valid phone number");
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = async (values) => {
    values.owner = user._id;
    setShippingInfo(values);
    uploadInfo();
  };

  return (
    <div className="p-4">
      <Form layout="vertical" className="mt-5" onFinish={onFinish}>
        <h2 className="text-xl">Enter Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item label="First Name" name={"firstName"} rules={rules}>
            <Input className="s-input" />
          </Form.Item>
          <Form.Item label="Last Name" name={"lastName"} rules={rules}>
            <Input className="s-input" />
          </Form.Item>
        </div>
        <Form.Item
          label="Phone Number"
          name={"phone"}
          rules={[...rules, { validator: validatePhoneNumber }]}
        >
          <Input className="s-input" />
        </Form.Item>
        <h3 className="text-lg font-semibold">Delivery Information</h3>
        <Form.Item label="Address" name={"address"} rules={rules}>
          <Input className="s-input" />
        </Form.Item>
        <Form.Item label="Unit Type" name={"unitType"} rules={rules}>
          <Select className="s-input">
            <Select.Option value="house">House</Select.Option>
            <Select.Option value="apartment">Apartment</Select.Option>
          </Select>
        </Form.Item>
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <Form.Item
          label="Choose Payment Method"
          name={"paymentMethod"}
          rules={rules}
        >
          <Radio.Group>
            <Radio value={"payOnDelivery"}>Pay On Delivery</Radio>
          </Radio.Group>
        </Form.Item>
        <p className="text-red-600 text-sm">
          Credit Card Is Not Available For Now
        </p>
        <Button type="default" htmlType="submit" block>
          Checkout
        </Button>
      </Form>
    </div>
  );
};

export default ShippingForm;
