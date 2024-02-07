import React from 'react';

const RightSideBar = () => {
  return (
    <div
      className='sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px]
     flex flex-col gap-12 overflow-auto p-6  py-6 pr-10 max-lg-hidden'
    >
      <h4 className='text-heading4-bold text-light-1'>Following</h4>
      <div className='flex flex-col gap-4'>mapping users</div>

      <h4 className='text-heading4-bold text-light-1'>Suggested People</h4>
      <div className='flex flex-col gap-4'>mapping users</div>
    </div>
  );
};

export default RightSideBar;
