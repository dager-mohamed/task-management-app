import React from "react";
import TaskIcon from '@heroicons/react/24/outline/RectangleStackIcon'
import LogoutIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import { useNavigate } from 'react-router-dom'


export function Sidebar() {
  const navigate = useNavigate()
  function LogOut(){
  localStorage.clear()
  navigate('/')
  }
  return (
    <div>
      <div className="h-screen w-20 bg-zinc-800">
        <div className="flex flex-col items-center h-full">
          <div className="mt-12 flex flex-col gap-5 h-full">
            <div className="bg-zinc-700 cursor-pointer transition-all ease duration-75 p-2 pl-3 pr-3 rounded-md">
            <TaskIcon width={24} color={'#ffffff'} />
            </div>
            <div onClick={LogOut} className="hover:bg-zinc-700 cursor-pointer transition-all ease duration-75 p-2 pl-3 pr-3 rounded-md bottom-4 absolute ">
              <LogoutIcon width={24} color={'#ffffff'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
