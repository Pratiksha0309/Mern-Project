import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const location = useLocation();

  // ✅ Get category from Card click
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setCategory([location.state.selectedCategory]);
    }
  }, [location.state]);

  // ✅ Toggle category checkboxes
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Toggle subcategory checkboxes
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Apply filters
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
          category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
          subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // ✅ Sort products
  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // 🪄 Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
      <motion.div
          className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
      >
        {/* Filter Options */}
        <motion.div
            className="min-w-60"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center cursor-pointer gap-2 text-[#bd4a53] font-serif"
          >
            Filters
            <img
                className={`h-3 sm:hidden transition-transform duration-300 ${
                    showFilter ? "rotate-90" : ""
                }`}
                src={assets.dropdown_icon}
                alt=""
            />
          </p>

          {/* Category Filter */}
          <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showFilter || window.innerWidth >= 640 ? "auto" : 0,
                opacity: showFilter || window.innerWidth >= 640 ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
          >
            <div className="border border-gray-300 pl-5 py-3 mt-6">
              <p className="mb-3 text-base  text-[#bd4a53] font-serif font-semibold">Categories</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {["Men", "Women", "Kids"].map((cat) => (
                    <label key={cat} className="flex gap-2 items-center cursor-pointer">
                      <input
                          className="w-3 h-3 cursor-pointer accent-black"
                          type="checkbox"
                          value={cat}
                          onChange={toggleCategory}
                          checked={category.includes(cat)}
                      />
                      {cat}
                    </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SubCategory Filter */}
          <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showFilter || window.innerWidth >= 640 ? "auto" : 0,
                opacity: showFilter || window.innerWidth >= 640 ? 1 : 0,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="overflow-hidden"
          >
            <div className="border border-gray-300 pl-5 py-3 my-5">
              <p className="mb-3 text-base text-[#bd4a53] font-serif font-semibold">Type</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                    <label key={sub} className="flex gap-2 items-center cursor-pointer">
                      <input
                          className="w-3 h-3 cursor-pointer accent-black"
                          type="checkbox"
                          value={sub}
                          onChange={toggleSubCategory}
                          checked={subCategory.includes(sub)}
                      />
                      {sub}
                    </label>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-6 ">
           <h1 className="text-[#ffffff] text-2xl ">.</h1> 
            <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-[#d18087] text-sm px-3 py-1 rounded-md font-serif"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
                key={filterProducts.length}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"
            >
              {filterProducts.map((item) => (
                  <motion.div
                      key={item._id}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="rounded-xl  p-3 border overflow-hidden bg-white cursor-pointer transition-all"
                  >
                    <ProductItem
                        name={item.name}
                        id={item._id}
                        price={item.price}
                        image={item.image}
                    />
                  </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
  );
};

export default Collection;
