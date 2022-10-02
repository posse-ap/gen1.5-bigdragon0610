import React from "react";
import Image from "next/image";

const Header: React.VFC = () => {
  return (
    <div className='flex h-[60px] p-5'>
      <Image
        src='/images/posselogo.jpg'
        alt='POSSE LOGO'
        width={100}
        height={20}
      />
      {/* TODO: week数を動的に変更する */}
      {/* <p className='text-[#9CBDD3] my-auto pl-5'>
        <span>61</span>th week
      </p> */}
    </div>
  );
};

export default Header;
