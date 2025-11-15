import { FaExchangeAlt } from "react-icons/fa";
import { MdHighQuality, MdSupportAgent } from "react-icons/md";

const policies = [
  {
    icon: <FaExchangeAlt className="text-5xl text-[#bd4a53]" />,
    title: "Easy Exchange Policy",
    desc: "Enjoy a smooth and hassle-free product exchange process.",
  },
  {
    icon: <MdHighQuality className="text-5xl text-[#bd4a53]" />,
    title: "7 Days Return Policy",
    desc: "Shop confidently with our 7-day free return policy.",
  },
  {
    icon: <MdSupportAgent className="text-5xl text-[#bd4a53]" />,
    title: "24/7 Customer Support",
    desc: "Our support team is always here to assist you — anytime, anywhere.",
  },
];

const OurPolicy = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-center md:text-7xl text-6xl mb-10 text-[#bd4a53] italianno-regular">
          Our Policy
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {policies.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="mb-5 hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
