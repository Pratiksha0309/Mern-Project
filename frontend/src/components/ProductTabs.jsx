import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../api/productApi";

const ProductTabs = () => {
    const {products} = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("bestseller");
  const [displayProducts, setDisplayProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products?.length > 0) {
      if (activeTab === "bestseller") {
        const bestProduct = products.filter((item) => item.bestseller);
        setDisplayProducts(bestProduct.slice(0, 4));
      } else {
        setDisplayProducts(products.slice(0, 4));
      }
    }
  }, [products, activeTab]);

  return (
    <div className="my-16">
      {/* Section Heading */}
      <div className="text-center md:text-7xl text-6xl py-8 text-[#bd4a53] italianno-regular">
           Our  Collections 
        <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-600">
          Explore our most popular and newest arrivals in one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 sm:gap-12 mb-10">
        {["bestseller", "latest"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm sm:text-base font-medium border-b-2 transition-all duration-300 ${
              activeTab === tab
                ? "border-[#bd4a53] text-[#bd4a53]"
                : "border-transparent text-gray-500 hover:text-[#bd4a53]"
            }`}
          >
            {tab === "bestseller" ? "Best Sellers" : "Latest Collection"}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
          {/* Product Cards */}
          {displayProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/product/${item._id}`);
              }}
              className="rounded-xl border overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-sm sm:text-base font-medium text-[#bd4a53] truncate">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">₹{item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}

          {/* Explore More Card */}
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/collection");
            }}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-xl cursor-pointer bg-gray-50 group transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col items-center justify-center text-center px-4 py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-[#bd4a53]  mb-2 group-hover:text-[#bd4a53] transition-colors duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <h3 className="text-lg font-semibold text-[#bd4a53]  group-hover:text-[#bd4a53] transition-colors">
                Explore More
              </h3>
              <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-700">
                View Full Collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
