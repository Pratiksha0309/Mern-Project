import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Show only 4 latest products
        setLatestProducts(products.slice(0, 4));
    }, [products]);

    return (
        <div className="my-10">
            {/* Heading */}
            <div className="text-center py-8 text-3xl">
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Fresh arrivals that redefine modern elegance
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Latest Products */}
                {latestProducts.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}

                {/* Explore More Card */}
                <div
                    onClick={() => navigate("/collection")}
                    className="flex flex-col items-center justify-center border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 bg-gray-50 group"
                >
                    <div className="flex flex-col items-center justify-center text-center px-4 py-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-gray-500 mb-2 group-hover:text-black transition-colors duration-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 group-hover:text-black transition-colors">
                            Explore More
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-700">
                            Discover the full collection
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestCollection;
