import { Carousel } from "antd";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner3.png";


const Hero = () => {
  const images = [
    {
      src: banner2,     
    },
    {
      src: banner1,
    } 
   
  ];

  return (
    <div className="flex flex-col sm:flex-row border-gray-400">
      <div className="w-full">
        <Carousel autoplay dotPosition="bottom">
          {images.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.src}
                alt={`Slide ${index + 1}`}
                className="w-full md:h-[500px] object-cover brightness-75"
              />
          
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
