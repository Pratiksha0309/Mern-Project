import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
      useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
      <div className="border-t pt-14 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <div className="text-2xl mb-3">
 <h2 className="md:text-7xl text-6xl text-[#bd4a53] italianno-regular">
      Your Cart
    </h2>     
       </div>

        {/* 🛒 If Cart is Empty */}
        {cartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
              <img
                  src={assets.empty_cart || "https://cdn-icons-png.flaticon.com/512/2038/2038854.png"}
                  alt="Empty Cart"
                  className="w-40 mb-6 opacity-80"
              />
              <p className="text-lg font-medium mb-3">
                Your cart is currently empty.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Looks like you haven’t added anything yet.
              </p>
              <button
                  onClick={() => navigate("/collection")}
                  className="bg-[#bd4a53] text-white text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
        ) : (
            <>
              {/* 🧺 Cart Items */}
              <div>
                {cartData.map((item, index) => {
                  const productData = products.find(
                      (product) => product._id === item._id
                  );

                  return (
                      <div
                          key={index}
                          className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                      >
                        <div className="flex items-start gap-6">
                          <img
                              className="w-16 sm:w-20"
                              src={productData.image[0]}
                              alt={productData.name}
                          />
                          <div>
                            <p className="text-xs sm:text-lg font-medium">
                              {productData.name}
                            </p>
                            <div className="flex items-center gap-5 mt-2">
                              <p>
                                {currency}
                                {productData.price}
                              </p>
                              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                {item.size}
                              </p>
                            </div>
                          </div>
                        </div>

                        <input
                            onChange={(e) =>
                                e.target.value === "" || e.target.value === "0"
                                    ? null
                                    : updateQuantity(
                                        item._id,
                                        item.size,
                                        Number(e.target.value)
                                    )
                            }
                            className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                            type="number"
                            min={1}
                            defaultValue={item.quantity}
                        />

                        <img
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className="w-4 mr-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform"
                            src={assets.bin_icon}
                            alt="Remove"
                        />
                      </div>
                  );
                })}
              </div>

              {/* 🧾 Cart Summary */}
              <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                  <CartTotal />
                  <div className="w-full text-end">
                    <button
                        onClick={() => navigate("/place-order")}
                        className="bg-[#bd4a53] text-white text-sm my-8 px-8 py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default Cart;
