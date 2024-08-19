"use client"
import { useState } from "react";
import Navbar from "@/components/Navbar";
export default function TeleExpertise(){
  const [theme, setTheme] = useState('light');
  return (
    
    <>
        
      <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-[#e6f2ff]' : 'bg-gray-800'}`}>
        <Navbar tab="Tele-Exepertise"/>
      </div>
    </>
  )
}