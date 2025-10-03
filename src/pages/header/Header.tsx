import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { CgProfile } from "react-icons/cg";
import UserProfile from "../authUser/UserProfile";


const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartProducts = useSelector((state:RootState)=>state.cart.items);
  // console.log("cartProductssdsds", cartProducts);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <header className="header">
      <div className="left-section">
        <span className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={24} />
        </span>

        <h1 className="logo">Shopping Cart</h1>
      </div>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <span className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <RxCross1 size={28} />
        </span>
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${isActive ? "active" : ""} `}
        >
          Home
        </NavLink>
        <NavLink
          to="/product-list"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${isActive ? "active" : ""} `}
        >
          Product List
        </NavLink>
       
        <NavLink
          to="/product-gallary"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${isActive ? "active" : ""} `}
        >
          Gallary
        </NavLink>
        <NavLink
          to="/shoping-cart"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => `${isActive ? "active" : ""} `}
        >
          Bag<span className="cart-count">{cartProducts?.length ?? 0}</span>
        </NavLink>

        <div className="profile-wrapper" ref={dropdownRef}>
          <span onClick={() => setShowDropdown(!showDropdown)}>
            <CgProfile size={24} />
          </span>
          {showDropdown && (
            <UserProfile onClose={() => setShowDropdown(false)} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
