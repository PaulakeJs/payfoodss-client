import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ShippingForm from "./ShippringForm";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetDeliveryInfo, NewDeliveryInfo } from "../../apicalls/deliveryapi";
import { SetLoader } from "../../redux/loaderSlice";
import { NewOrder } from "../../apicalls/orderapi";

const Billing = () => {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { user } = useSelector((state) => state.users);
  const location = useLocation();
  const cart = location.state?.data || [];

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.foodprice * item.foodquantity,
      0
    );
  };

  const uploadInfo = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await NewDeliveryInfo(shippingInfo);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const checkInfo = async () => {
    try {
      const response = await GetDeliveryInfo(user._id);
      if (response.success) {
        setContactInfo(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    checkInfo();
  }, []);

  const handleUseContact = (contact) => {
    setSelectedContact(contact);
  };
  const handlePlaceOrder = async () => {
    // Create an array to store information for each item in the cart
    const itemsData = cart.map((item) => ({
      itemName: item.foodtitle,
      itemPrice: item.foodprice * item.foodquantity,
      itemQuantity: item.foodquantity,
    }));

    // Construct formData with selected contact and items data
    const formData = {
      contact: selectedContact,
      items: itemsData,
      owner:user._id
    };

    try {
      dispatch(SetLoader(true));
      const response = await NewOrder(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Cart / Billing</h2>
            <div className="flex items-center">
              <AiOutlineShoppingCart className="text-2xl mr-2" />
              <span className="text-gray-600">{cart.length} Items</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 border border-gray-200 p-4 rounded-md"
                >
                  <div>
                    <p className="font-semibold">Title: {item.foodtitle}</p>
                    <p>Quantity: {item.foodquantity}</p>
                    <p>Price: ${item.foodprice * item.foodquantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="font-semibold text-xl">
              Total: ${calculateSubtotal()}
            </h2>
          </div>
        </div>
        {cart.length > 0 && (
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md rounded-md p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">
                  Shipping Information
                </h2>
                {contactInfo != null && (
                  <p
                    className="cursor-pointer text-blue-500"
                    onClick={() => setContactInfo(null)}
                  >
                    Add New Info
                  </p>
                )}
              </div>
              {contactInfo && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold">
                    Use Previous Shipping Information
                  </h2>
                  {contactInfo.map((contact, index) => (
                    <div key={index}>
                      <div className="flex flex-row mt-4">
                        <div>
                          <p>
                            Name {contact.firstName + " " + contact.lastName}
                          </p>
                          <p>Phone: {contact.phone}</p>
                          <p>Address: {contact.address}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <Button
                          block
                          onClick={() => handleUseContact(contact)}
                          disabled={
                            selectedContact !== null &&
                            selectedContact._id !== contact._id
                          }
                        >
                          {selectedContact !== null &&
                          selectedContact._id === contact._id
                            ? "Selected"
                            : "Use"}
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border border-dashed border-gray-700 p-5 m-6">
                    <Button
                      block
                      className="mt-0"
                      onClick={handlePlaceOrder}
                      disabled={!selectedContact}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
              {contactInfo == null && (
                <ShippingForm
                  shippingInfo={shippingInfo}
                  setShippingInfo={setShippingInfo}
                  uploadInfo={uploadInfo}
                  disabled={selectedContact !== null}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
