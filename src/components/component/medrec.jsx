"use client"
import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Navbar from "../Navbar"
import './custom.css';
import {
  UserIcon,
  CalendarIcon
} from '../ui/icons';

export function Medrec() {
  const [language, setLanguage] = useState("fr")
  const [activeButton, setActiveButton] = useState("")
  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr")
  }
  const handleButtonClick = (button) => {
    setActiveButton(button)
  }
  return (
    (<div className="flex flex-col min-h-screen bg-[#e6f2ff]">
      <div className="flex flex-1 border-t border-muted-foreground/20">
        <main className="flex-1 p-8 bg-[#e6f2ff]">
          <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32"> 
            <AvatarImage src="/264x264.jpg" alt="User Image" className="w-full h-full object-cover" /> 
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
            <div className="text-center text-primary">
              <p className="font-bold">BERRADA</p>
              <p>
                {language === "fr"
                  ? "NIP : A123456"
                  : "\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641: A123456"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 justify-center">
            <Link href="/profile">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background shadow-md hover:bg-muted/50 transition-colors">
                <UserIcon className="w-8 h-8 text-primary" />
                <p className="font-bold text-primary">
                  {language === "fr" ? "Mon profil" : "\u0645\u0644\u0641\u064A \u0627\u0644\u0634\u062E\u0635\u064A"}
                </p>
              </div>
            </Link>

            <Link href="/Historique">
              <div className="flex flex-col items-center p-4 space-y-2 border rounded-md bg-background shadow-md hover:bg-muted/50 transition-colors">
                <CalendarIcon className="w-8 h-8 text-primary" />
                <p className="font-bold text-primary">
                  {language === "fr" ? "Historique médical" : "تاريخ طبي"}
                </p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>)
  );
}
