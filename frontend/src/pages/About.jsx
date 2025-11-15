import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
    return (
        <div className="text-gray-700">
            {/* Page Header */}
           <section className="text-center pt-16 border-t border-gray-200">
    <h2 className="md:text-7xl text-6xl text-[#bd4a53] italianno-regular">
        About Us
    </h2>

    <p className="max-w-2xl mx-auto mt-4 text-gray-500 text-sm md:text-base">
        Discover who we are, what drives us, and why customers across the
        world trust our brand for quality and style.
    </p>
    </section>


            {/* About Section */}
            <section className="my-16 flex flex-col md:flex-row items-center gap-12 md:gap-20 px-6 md:px-12 lg:px-20">
                <img
                    className="w-full md:max-w-[450px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    src={assets.about_img}
                    alt="About Us"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        <span className="font-semibold  text-[#bd4a53]">Fashion</span> was
                        born out of a passion for innovation and a desire to redefine online
                        shopping. Our journey began with a simple mission — to create a
                        platform that allows everyone to explore, discover, and enjoy
                        high-quality products with confidence and ease.
                    </p>
                    <p>
                        From our humble beginnings, we’ve grown into a trusted destination
                        for fashion, lifestyle, and home essentials — handpicked from
                        reputable brands and curated with care.
                    </p>

                    <div className="mt-2">
                        <h3 className="text-lg font-semibold  text-[#bd4a53] mb-2">
                            Our Mission
                        </h3>
                        <p>
                            We aim to empower customers with{" "}
                            <span className="font-semibold  text-[#bd4a53]">choice</span>,{" "}
                            <span className="font-semibold  text-[#bd4a53]">convenience</span>,
                            and <span className="font-semibold  text-[#bd4a53]">confidence</span>.
                            We’re dedicated to offering a seamless shopping experience —
                            from browsing and ordering to delivery and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white py-20 px-6 md:px-12 lg:px-20 rounded-t-3xl shadow-inner">
                <div className="text-center text-3xl mb-10">
 <h2 className="md:text-7xl text-6xl text-[#bd4a53] italianno-regular">
        Why Choose Us
    </h2>                    <p className="text-gray-500 text-sm md:text-base mt-2">
                        We don’t just sell — we ensure every customer feels confident and
                        valued.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-sm">
                    <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center">
                        <h4 className="font-semibold  text-[#bd4a53] text-lg">
                            Quality Assurance
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                            Every product is carefully selected and quality-checked to meet
                            our high standards — because you deserve the best.
                        </p>
                    </div>

                    <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center">
                        <h4 className="font-semibold text-[#bd4a53] text-lg">Convenience</h4>
                        <p className="  leading-relaxed">
                            With our user-friendly website, fast checkout, and reliable
                            delivery, shopping has never been this effortless.
                        </p>
                    </div>

                    <div className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl px-8 py-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-center">
                        <h4 className="font-semibold  text-[#bd4a53] text-lg">
                            Exceptional Support
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                            Our dedicated customer care team is available 24/7 to ensure every
                            experience is smooth, simple, and satisfying.
                        </p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <div className="mt-24 mb-10">
                <NewsletterBox />
            </div>
        </div>
    );
};

export default About;
