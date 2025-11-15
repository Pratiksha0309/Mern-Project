import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(
                `${backendUrl}/api/product/add`,
                formData,
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(" Product added successfully!");
                setName("");
                setDescription("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice("");
                setSizes([]);
                setBestseller(false);

                // Wait for 1.5s to let the toast show, then reload
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3"
        >
            {/* Upload Images */}
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4].map((num) => (
                        <label key={num} htmlFor={`image${num}`}>
                            <img
                                className="w-20 h-20 object-cover border rounded cursor-pointer hover:opacity-80 transition-all"
                                src={
                                    !eval(`image${num}`)
                                        ? assets.upload_area
                                        : URL.createObjectURL(eval(`image${num}`))
                                }
                                alt=""
                            />
                            <input
                                onChange={(e) =>
                                    eval(`setImage${num}`)(e.target.files[0])
                                }
                                type="file"
                                id={`image${num}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Name */}
            <div className="w-full">
                <p className="mb-2">Product name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
                    type="text"
                    placeholder="Type here"
                    required
                />
            </div>

            {/* Product Description */}
            <div className="w-full">
                <p className="mb-2">Product description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
                    placeholder="Write content here"
                    required
                />
            </div>

            {/* Category / Subcategory / Price */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Sub category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded"
                        type="number"
                        placeholder="25"
                        required
                    />
                </div>
            </div>

            {/* Sizes */}
            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((item) => item !== size)
                                        : [...prev, size]
                                )
                            }
                        >
                            <p
                                className={`${
                                    sizes.includes(size)
                                        ? "bg-pink-200 border border-pink-400"
                                        : "bg-slate-200"
                                } px-3 py-1 cursor-pointer rounded transition-all`}
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <div className="flex gap-2 mt-2">
                <input
                    onChange={() => setBestseller((prev) => !prev)}
                    checked={bestseller}
                    type="checkbox"
                    id="bestseller"
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                    Add to bestseller
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-32 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800 transition-all duration-300"
            >
                {loading ? "ADDING..." : "ADD"}
            </button>
        </form>
    );
};

export default Add;
