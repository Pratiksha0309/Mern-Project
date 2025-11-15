import React, { useContext, useState, useEffect } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    // ❌ Prevent direct access when cart is empty
    useEffect(() => {
        if (Object.keys(cartItems).length === 0) {
            navigate('/', { replace: true });
        }
    }, [cartItems]);

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    // Razorpay Payment
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,

            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        response,
                        { headers: { token } }
                    );

                    if (data.success) {
                        setCartItems({});
                        toast.success("Payment successful! Order placed 🎉");
                        navigate('/orders', { replace: true });
                    }

                } catch (error) {
                    toast.error("Payment verification failed");
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let orderItems = [];

            for (const productId in cartItems) {
                for (const size in cartItems[productId]) {
                    if (cartItems[productId][size] > 0) {
                        const itemInfo = {
                            ...products.find(p => p._id === productId),
                            size,
                            quantity: cartItems[productId][size]
                        };
                        orderItems.push(itemInfo);
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            switch (method) {

                // 📦 CASH ON DELIVERY
                case 'cod':
                    const codRes = await axios.post(
                        backendUrl + '/api/order/place',
                        orderData,
                        { headers: { token } }
                    );

                    if (codRes.data.success) {
                        setCartItems({});
                        toast.success("Order placed successfully! 🎉");
                        navigate('/orders', { replace: true });
                    } else {
                        toast.error(codRes.data.message);
                    }
                    break;

                // 💳 Razorpay
                case 'razorpay':
                    const rzr = await axios.post(
                        backendUrl + '/api/order/razorpay',
                        orderData,
                        { headers: { token } }
                    );

                    if (rzr.data.success) {
                        initPay(rzr.data.order);
                    }
                    break;

                default:
                    break;
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'
        >

            {/* LEFT SIDE — DELIVERY FORM */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3 text-[#bd4a53]'>
                    Delivery Information
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>

                <input required onChange={onChangeHandler} name='email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
                    <input onChange={onChangeHandler} name='state' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
                </div>

                <div className='flex gap-3 '>
                    <input required onChange={onChangeHandler} name='zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
                </div>

                <input required onChange={onChangeHandler} name='phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone' />
            </div>

            {/* RIGHT SIDE — PAYMENT */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <p className='text-[#bd4a53]'>Payment Method</p>

                    <div className='flex gap-3 flex-col lg:flex-row'>
                        {/* Razorpay */}
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />
                        </div>

                        {/* COD */}
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-[#bd4a53] text-white px-16 py-3 text-sm'>
                            PLACE ORDER
                        </button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
