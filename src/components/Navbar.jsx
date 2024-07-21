"use client";

import React, { useState, useEffect, useRef } from 'react';
import LogoJeune from './LogoJeune';
import { FaBars, FaRegUserCircle, FaChevronDown } from 'react-icons/fa';
import { PiSignOut } from "react-icons/pi";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import { GlobeIcon } from './ui/icons';

export default function Navbar() {
  const [language, setLanguage] = useState("fr");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);


  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem('selectedTab') || 'Dossier Medical';
  });
  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);
  

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const handleButtonClick = (button) => {
    setActiveButton(button);
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setIsOpen(false); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    setDropdownOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
      setLanguageDropdownOpen(false); 
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { title: "Profile", icon: <FaRegUser /> },
    { title: "Se déconnecter", icon: <PiSignOut /> },
  ];

  const navItems = [
    { title: 'Accueil', href: '/' },
    { title: 'Dossier Medical', href: '/Historique' },
    { title: 'Education à la Santé', href: '/ies/youth' },
    { title: 'Tests Psychologiques', href: '#' },
  ];

  console.log(selectedTab);

  return (
    <nav className="fixed-navbar p-4 shadow-gray-300 shadow-md h-16 flex items-center justify-between bg-white text-black relative">
      <div className="container mx-auto flex items-center justify-between">
        <LogoJeune height={60} width={120} className="lg:hidden mx-auto" />
        <div className="hidden lg:flex flex-grow justify-center space-x-12 font-medium">
          {navItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className={`hover:font-semibold text-gray-950 ${selectedTab === item.title ? 'border-b-4 pb-2 border-blue-900 font-semibold' : ''}`}
              onClick={() => handleTabClick(item.title)}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex items-center space-x-2 relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center space-x-2 text-blue-950">
            <FaRegUserCircle size={24} />
            <span>Ahmed M.</span>
            <FaChevronDown size={16} />
          </button>
          {dropdownOpen && (
            <div className="absolute -right-12 top-8 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <li key={item.title} className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    {item.icon}
                    <button onClick={item.action} className="block text-sm font-medium text-gray-700">
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${activeButton === "language" ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30" : ""}`}
            onClick={() => {
              handleButtonClick("language")
              toggleLanguageDropdown()
            }}
          >
            <GlobeIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Language</span>
          </Button>
          {languageDropdownOpen && (
            <div className="absolute -right-12 top-8 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/france-flag.svg" alt="France Flag" className="w-5 h-5" />
                  {language === "fr" ? <IoCheckmark /> : <RxCross1 />}
                  <button onClick={() => toggleLanguage("fr")} className="block text-sm font-medium text-gray-700">
                    Français
                  </button>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                  <img src="/saudi-arabia-flag.svg" alt="Saudi Arabia Flag" className="w-5 h-5" />
                  {language === "ar" ? <IoCheckmark /> : <RxCross1 />}
                  <button onClick={() => toggleLanguage("ar")} className="block text-sm font-medium text-gray-700">
                    العربية
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${activeButton === "language" ? "bg-muted dark:bg-muted-foreground/20 hover:bg-muted/50 dark:hover:bg-muted-foreground/30" : ""}`}
            onClick={() => {
              handleButtonClick("language")
              toggleLanguageDropdown()
            }}
          >
            <GlobeIcon className="w-6 h-6 text-primary dark:text-primary-foreground" />
            <span className="sr-only">Language</span>
          </Button>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
        </div>
      </div>
      
      {languageDropdownOpen && (
        <div className="absolute top-16 right-0 w-48 bg-gray-50 border border-gray-300 rounded-md shadow-lg z-10 lg:hidden">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
              <img src="/france-flag.svg" alt="France Flag" className="w-5 h-5" />
              {language === "fr" ? <IoCheckmark /> : <RxCross1 />}
              <button onClick={() => toggleLanguage("fr")} className="block text-sm font-medium text-gray-700">
                Français
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
              <img src="/saudi-arabia-flag.svg" alt="Saudi Arabia Flag" className="w-5 h-5" />
              {language === "ar" ? <IoCheckmark /> : <RxCross1 />}
              <button onClick={() => toggleLanguage("ar")} className="block text-sm font-medium text-gray-700">
                العربية
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-0 lg:hidden z-50`}>
        <div ref={sidebarRef} className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out p-4 bg-white h-full flex flex-col justify-between w-3/5 sm:w-2/5`}>
          <div>
            <div className="flex justify-between mb-4">
              <LogoJeune height={60} width={120} />
              <button onClick={toggleSidebar} className="text-black">
                <RxCross1 size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <div key={item.title}>
                  <a
                    href={item.href}
                    className={`pb-2 flex justify-between items-center text-black hover:font-bold font-semibold transition-colors duration-300 ease-in-out ${selectedTab === item.title ? 'font-bold' : ''}`}
                    onClick={() => handleTabClick(item.title)}
                  >
                    {item.title}
                    <FiChevronRight />
                  </a>
                  <hr className="border-gray-300 " />
                </div>
              ))}
            </nav>
          </div>
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                <button onClick={item.action} className="flex items-center space-x-2 text-black hover:font-semibold transition-colors duration-300 ease-in-out">
                  {item.icon}
                  <span>{item.title}</span>
                </button>
                <hr className="border-gray-300" />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
}
