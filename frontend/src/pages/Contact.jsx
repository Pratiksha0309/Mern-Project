import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
    return (
        <div className="text-gray-700">
            {/* Header */}
            <section className="text-center text-3xl pt-16 border-t border-gray-200">
 <h2 className="md:text-7xl text-6xl text-[#bd4a53] italianno-regular">
       Contact Us
    </h2>                <p className="max-w-2xl mx-auto mt-4 text-gray-500 text-sm md:text-base">
                    We’d love to hear from you. Whether you have questions about products,
                    orders, or career opportunities — our team is here to help.
                </p>
            </section>

            {/* Main Contact Section */}
            <section className="my-16 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6 md:px-12 lg:px-20">
                {/* Image */}
                <img
                    className="w-full md:max-w-[480px] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    src={assets.contact_img}
                    alt="Contact Us"
                />

                {/* Info */}
                <div className="flex flex-col justify-center gap-6 max-w-md">
                    <div>
                        <h3 className="font-semibold text-xl text-[#bd4a53] mb-1">Our Store</h3>
                        <p className="text-gray-500 leading-relaxed">
                            54709 Willms Station <br /> Suite 350, Washington, USA
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl text-[#bd4a53] mb-1">
                            Contact Information
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            Tel: (415) 555-0132 <br />
                            Email: admin@fashion.com
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-xl text-[#bd4a53] mb-1">
                            Careers at Fashion
                        </h3>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            Passionate about fashion and innovation? Discover exciting roles
                            across our teams and grow with us.
                        </p>
                        <button className="border border-[#bd4a53] text-[#bd4a53] px-8 py-3 text-sm font-medium tracking-wide rounded-full hover:bg-[#bd4a53] hover:text-white transition-all duration-500">
                            Explore Jobs
                        </button>
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

export default Contact;
