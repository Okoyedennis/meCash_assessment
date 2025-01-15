import React from "react";

interface HeaderProps {
  heading: string;
}
const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <div className="h-[74px] flex items-start md:items-center flex-col md:flex-row justify-between bg-white  md:p-8 shadow-shadow2">
      <h3 className="font-medium text-[15px] leading-[38px] text-grayscalBody2 ">
        meCash
      </h3>
      <h3 className="font-medium text-[15px] leading-[38px] text-grayscalBody2 capitalize">
        {`Hello ${heading}`}
      </h3>
    </div>
  );
};

export default Header;
