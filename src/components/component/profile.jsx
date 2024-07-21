"use client"
import Navbar from "../Navbar"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserImage } from "../ui/icons";

export function Profile() {
  const translatedData = {
    name: "BERRADA KARIM",
    cin: "CIN: A123456",
    dob: "10/05/2000",
    gender: "Masculin",
    id: "j0001",
    education: "Non scolarisé",
    address: "Avenue Allal El Fassi, 10112 Rabat, Maroc",
    occupation: "Ouvrier",
    phone: "0612345678",
    email: "karim.berrada@example.com",
    bloodType: "O+"
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden`}>      
      <div className="flex justify-start p-4">
        <Button
          className="flex items-center justify-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <Link href="../" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </Button>
      </div>

      <div className={`p-6 grid grid-cols-1 gap-4`}>
        <div className="flex items-center space-x-4">
          <div className={`w-24 h-24 rounded-full bg-muted flex items-center justify-center`}>
            <UserImage
              src="/264x264.jpg"
              alt="User Image"
              width={96}
              height={96}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{translatedData.name}</h2>
            <p className={`text-muted-foreground`}>
              {translatedData.cin}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Date de naissance</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.dob}</strong>
            </p>
            
          </div>
          <div>
            <p>Sexe</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.gender}</strong>
            </p>
            
          </div>
          <div>
            <p>Id</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.id}</strong>
            </p>
            
          </div>
          <div>
            <p>Scolarité</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.education}</strong>
            </p>
            
          </div>
          <div>
            <p>Adresse</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.address}</strong>
            </p>
            
          </div>
          <div>
            <p>Activité</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.occupation}</strong>
            </p>
            
          </div>
          <div>
            <p>Numéro de téléphone</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.phone}</strong>
            </p>
            
          </div>
          <div>
            <p>
              Adresse mail
            </p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.email}</strong>
            </p>
            
          </div>
          <div>
            <p>Type de sang</p>
            <p className={`text-muted-foreground`}>
              <strong>{translatedData.bloodType}</strong>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
