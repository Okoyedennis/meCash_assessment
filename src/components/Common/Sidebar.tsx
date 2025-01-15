import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { BiLink } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
// import logo from "../../../assets/Logo-Main2.png";

interface SidebarItem {
  title: string;
  path: string;
  icon?: any;
  children?: SidebarItem[];
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toggleChildren, setToggleChildren] = useState<{
    [path: string]: boolean;
  }>({});
  const [hideHamburger, setHideHamburger] = useState(false);

  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      setOpen(false);
      setHideHamburger(false);
    } else {
      setOpen(true);
      setHideHamburger(false);
    }
  };

  useEffect(() => {
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, [isMobile]);

  const SidebarData: SidebarItem[] = [
    {
      title: "People",
      path: "/",
      icon: <IoIosPeople />,
    },
    {
      title: "Cars",
      path: "/cars",
      icon: <FaCar />,
    },
  ];

  useEffect(() => {
    const storedToggleState = localStorage.getItem("toggleChildrenState");
    if (storedToggleState) {
      setToggleChildren(JSON.parse(storedToggleState));
    }
  }, []);

  const toggleSidebarChildren = (path: number) => {
    setToggleChildren((prevState) => {
      const newState = Object.keys(prevState).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as { [path: string]: boolean }
      );

      newState[path] = !prevState[path];

      localStorage.setItem("toggleChildrenState", JSON.stringify(newState));

      return newState;
    });
  };
  return (
    <div
      className={`bg-primary text-white sticky top-0 h-screen bottom-0 w-[200px] md:w-[276px] flex-shrink-0 p-0 md:p-5 duration-300 ${
        !open ? "ml-[-200px] md:ml-[-280px]" : ""
      }`}>
      <div className="relative p-4 flex items-center justify-center md:justify-center">
        {/* <Link to="/module_selection">
          <img
            src={logo}
            alt="ARM"
            className="w-[102.48px] h-[49.44px] object-contain"
          />
        </Link> */}
        {!hideHamburger && (
          <MdKeyboardArrowRight
            className={`absolute cursor-pointer border-primary border-2 rounded-full w-[2rem] h-[2rem] bg-white lg:hidden text-black right-[-3rem] md:right-[-3.5rem]  ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        )}
      </div>
      <nav className="py-4 px-1 md:px-1">
        <ul>
          {SidebarData.map(({ title, path, icon, children }, index) => (
            <li
              className="transition-colors duration-300 mt-[.5rem]"
              key={index}>
              <div
                className={`flex rounded-md cursor-pointer text-Acc1 items-center w-full justify-between h-[44px] px-[10px] py-[10px] ${
                  toggleChildren[index] ? "bg-primary_disabled" : ""
                }`}
                onClick={() => toggleSidebarChildren(index)}>
                {children ? (
                  <>
                    <div
                      className={`flex items-center gap-2 
                  ${
                    toggleChildren[index]
                      ? "text-white"
                      : "text-primary_disabled"
                  }p
                  `}>
                      <div className="text-center text-2xl">{icon}</div>
                      <span className="origin-left duration-200 text-sm md:text-[15px] leading-[24px] font-medium">
                        {title}
                      </span>
                    </div>
                    <MdOutlineKeyboardArrowDown
                      className={`text-xl ${
                        toggleChildren[index] ? "text-white" : " rotate-180"
                      }`}
                    />
                  </>
                ) : (
                  <div className="parent">
                    <NavLink
                      to={path}
                      className={`flex items-center gap-2 
                  ${
                    toggleChildren[index]
                      ? "text-white"
                      : "text-primary_disabled"
                  }
                  `}>
                      <div className="text-center text-2xl">{icon}</div>
                      <span className="origin-left duration-200 text-sm md:text-[15px] leading-[24px] font-medium">
                        {title}
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
              {children && toggleChildren[index] && (
                <ul className="children">
                  {children.map((child, indexTwo) => (
                    <li
                      key={indexTwo}
                      className="transition-colors duration-300">
                      <NavLink
                        to={child.path}
                        className="flex rounded-md cursor-pointer text-Acc1 items-center w-full justify-between text-primary_disabled px-[16px] py-[10px]">
                        <div className="flex items-center justify-between gap-2">
                          <BiLink className="text-center text-2xl text-transparent" />
                          <span className="self-center text-sm font-medium leading-[19.12px]">
                            {child.title}
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
