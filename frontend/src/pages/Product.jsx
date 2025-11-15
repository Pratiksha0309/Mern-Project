import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, navigate } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");

    // ✅ Fetch product details based on URL param
    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        });
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    // ✅ Add product to cart with validation and toast
    const handleAddToCart = () => {
        if (!size) {
            toast.warning("Please select a size before adding to cart!", {
                position: "top-right",
                autoClose: 1500,
            });
            return;
        }

        addToCart(productData._id, size);

        toast.success(`${productData.name} added to cart! 🛍️`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
        });

        // Navigate to cart after a short delay (to let toast display)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top

        }, 1600);
        navigate("/cart");
    }

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
            {/* Product Data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border ${
                                    image === item ? "border-black" : "border-transparent"
                                } transition-all`}
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto rounded-md shadow-sm" src={image} alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2 text-[#bd4a53]">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4].map((i) => (
                            <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
                        ))}
                        <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
                        <p className="pl-2 text-sm text-gray-500">(122 Reviews)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

                    {/* Size Selector */}
                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-medium">Select Size</p>
                        <div className="flex gap-2 flex-wrap">
                            {productData.sizes.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    key={index}
                                    className={`border py-2 px-4 rounded-md text-sm sm:text-base transition-all duration-200 ${
                                        size === item
                                            ? " bg-[#bd4a53] text-white"
                                            : "border-gray-300 bg-gray-100 hover:border-black"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#bd4a53] text-white px-8 py-3 text-sm active:bg-gray-700 rounded-md transition-all duration-200 hover:scale-[1.02]"
                    >
                        ADD TO CART
                    </button>

                    <hr className="mt-8 sm:w-4/5" />

                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>✅ 100% Original product.</p>
                        <p>💵 Cash on delivery available.</p>
                        <p>🔄 Easy return & exchange within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>
                        An e-commerce website facilitates buying and selling of products or services
                        online. It serves as a digital marketplace where businesses and individuals
                        can showcase products, interact with customers, and conduct transactions
                        seamlessly.
                    </p>
                    <p>
                        Each product includes detailed descriptions, images, and variations like
                        size or color. Our store ensures convenience, accessibility, and
                        reliability for all your shopping needs.
                    </p>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    ) : (
        <div className="flex justify-center items-center h-60">
            <p className="text-gray-500 animate-pulse">Loading product details...</p>
        </div>
    );
};

export default Product;
