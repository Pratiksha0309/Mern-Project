import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { Drawer } from 'antd';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `pb-1 flex flex-col items-center gap-1 ${isActive ? 'active text-[#973b42]' : 'text-gray-700'}`
            }
          >
            <span className="flex gap-2 font-serif font-semibold">{item.name}</span>
          </NavLink>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate('/login'))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          {token && (
            <div className="group-hover:block hidden absolute right-0 z-20">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#aa434b] text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          onClick={() => setOpenDrawer(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Ant Design Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={240}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpenDrawer(false)}
            className={({ isActive }) =>
              `block py-2 px-2 ${isActive ? 'text-[#973b42] font-medium' : 'text-gray-700'}`
            }
          >
            {item.name}
          </NavLink>
        ))}
        {token ? (
          <button
            onClick={() => {
              setOpenDrawer(false);
              logout();
            }}
            className="mt-4 block text-left py-2 px-2 text-red-600 font-medium"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="mt-4 block text-left py-2 px-2 text-blue-600 font-medium"
          >
            Login
          </button>
        )}
      </Drawer>
    </div>
  );
};

export default Navbar;
