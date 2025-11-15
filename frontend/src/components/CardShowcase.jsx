import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";


const categories = [
  { name: "Men", image: assets.men_category },
  { name: "Women", image: assets.women_category },
  { name: "Kids", image: assets.kid_category },
];

const CardShowcase = () => {
  const navigate = useNavigate();

  const handleCardClick = (categoryName) => {
    navigate("/collection", { state: { selectedCategory: categoryName } });
  };

  return (
    <div className="py-20 flex flex-col items-center justify-center">
      <div className="text-center md:text-7xl text-6xl mb-10 text-[#bd4a53] italianno-regular">
        Explore the {"Categories"}
      </div>

      <div className="flex md:flex-row flex-col items-center justify-center md:gap-10 gap-3 w-full max-w-7xl">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.name)}
            className="cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <Card
              hoverable
              bordered={false}
              className="text-center w-80 border bg-slate-50 shadow-md rounded-2xl transition-all duration-300 hover:shadow-2xl"
              bodyStyle={{ padding: "20px 20px" }}
            >
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-56 h-56 rounded-full object-cover border-4 shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-base font-semibold tracking-wide">
                      Shop Now
                    </span>
                  </div>
                </div>
                <h3 className="mt-6 text-4xl font-semibold text-[#bd4a53] group-hover:text-gray-900 transition-colors italianno-regular">
                  {item.name}
                </h3>
                <p className="text-gray-500 mt-1 text-base merriweather">
                  Discover our exclusive {item.name.toLowerCase()} collection
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardShowcase;
