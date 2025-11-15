    import React, { useContext, useState } from 'react'
    import { assets } from '../assets/assets'
    import { Link, NavLink } from 'react-router-dom'

    import { ShopContext } from '../context/ShopContext';

    const Navbar = () => {

        const [visible, setVisible] = useState(false);
        const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

        const logout = () => {
            navigate('/login');
            localStorage.removeItem('token');
            setToken('');
            setCartItems({});
        };

    const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    ];


        return (
            <div className='flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'>

                <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

                {/* Desktop Menu */}
                <ul className='hidden sm:flex gap-5 text-sm '>
                    {navItems.map((item) => (
                <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
            `nav-link pb-1 flex flex-col items-center gap-1 ${
                isActive ? "active text-[#973b42]" : "text-gray-700"
                }`
                }
                >
    
    <span className='flex gap-2  font-serif font-semibold'>{item.name}</span>
                </NavLink>
                ))}
                </ul>

                {/* Right Icons */}
                <div className='flex items-center gap-6'>
                    <img 
                        onClick={() => { setShowSearch(true); navigate('/collection'); }} 
                        src={assets.search_icon} 
                        className='w-5 cursor-pointer' 
                        alt="" 
                    />

                    {/* Profile Dropdown */}
                    <div className='group relative'>
                        <img 
                            onClick={() => token ? null : navigate('/login')} 
                            className='w-5 cursor-pointer' 
                            src={assets.profile_icon} 
                            alt="" 
                        />

                        {token && (
                            <div className='group-hover:block hidden absolute right-0 pt-4'>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#aa434b] text-white aspect-square rounded-full text-[8px]'>
                            {getCartCount()}
                        </p>
                    </Link>

                    <img 
                        onClick={() => setVisible(true)} 
                        src={assets.menu_icon} 
                        className='w-5 cursor-pointer sm:hidden' 
                        alt="" 
                    />
                </div>

                {/* Mobile Sidebar */}
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                            <p>Back</p>
                        </div>

                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `py-2 pl-6 border ${isActive ? "text-[#973b42] font-semibold" : ""}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

            </div>
        );
    };

    export default Navbar;
