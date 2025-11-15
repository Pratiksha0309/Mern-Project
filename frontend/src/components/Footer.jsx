import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#f2dbdd] to-white text-gray-300 pt-16 pb-8 px-6 md:px-12 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

                {/* Logo & Description */}
                <div>
                    <img src={assets.logo} className="mb-5 w-36" alt="Fashion Logo" />
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Fashion is your trusted destination for quality and style. Discover
                        the latest collections with a seamless shopping experience designed
                        for you.
                    </p>

                    <div className="flex gap-4 mt-6">
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src={assets.facebook} className="w-10 opacity-80 hover:opacity-100" alt="Facebook" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src={assets.instagram} className="w-10 opacity-80 hover:opacity-100" alt="Instagram" />
                        </a>
                        <a href="#" className="hover:scale-110 transition-transform duration-200">
                            <img src={assets.twitter} className="w-10 opacity-80 hover:opacity-100" alt="Twitter" />
                        </a>
                    </div>
                </div>

                {/* Company Links */}
                <div>
                    <p className="text-lg font-semibold text-black mb-5">Company</p>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li className="hover:text-black cursor-pointer transition-colors">Home</li>
                        <li className="hover:text-black cursor-pointer transition-colors">About Us</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Delivery</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <p className="text-lg font-semibold text-black mb-5">Support</p>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li className="hover:text-black cursor-pointer transition-colors">FAQs</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Return Policy</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Terms & Conditions</li>
                        <li className="hover:text-black cursor-pointer transition-colors">Track Order</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <p className="text-lg font-semibold text-black mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li className="hover:text-black cursor-pointer transition-colors">📞 +1 (212) 456-7890</li>
                        <li className="hover:text-black cursor-pointer transition-colors">📧 contact@Fashionyou.com</li>
                        <li className="hover:text-black cursor-pointer transition-colors">📍 New York, USA</li>
                    </ul>
                </div>

            </div>

            {/* Divider */}
            <div className="max-w-6xl mx-auto mt-10 border-t border-gray-700 pt-6 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} <span className="font-semibold text-black">Fashion.com</span> — All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
