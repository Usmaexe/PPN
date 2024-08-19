"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../Navbar"
import './custom.css';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { jsPDF } from "jspdf"
import { FaSearch, FaDownload, FaChevronDown, FaChevronUp, FaSort } from "react-icons/fa"

export default function Consultations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showInfo, setShowInfo] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [expandedConsultations, setExpandedConsultations] = useState([])
  const [sortMode, setSortMode] = useState("dateDesc")
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const [consultations, setConsultations] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const id = 7;

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jeunes/${id}`);
        const data = await response.json();
        setConsultations(data.dossierMedial.historiqueConsultations);
        console.log(consultations)

        const medecinPromises = data.dossierMedial.historiqueConsultations.map(consultation =>
          fetch(`http://localhost:8080/medecins/${consultation.medecin}`)
            .then(response => response.json())
            .then(medecinData => ({ [consultation.medecin]: `${medecinData.prenom} ${medecinData.nom}` }))
        );
  
        const medecinResults = await Promise.all(medecinPromises);
        const medecinsMap = Object.assign({}, ...medecinResults);

        setMedecins(medecinsMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchConsultations();
  }, [id]);
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleInfoClick = (consultation) => {
    setSelectedConsultation(consultation)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setSelectedConsultation(null)
  }

  const handleExpandClick = (id) => {
    setExpandedConsultations(prevState => 
      prevState.includes(id) ? prevState.filter(expId => expId !== id) : [...prevState, id]
    )
  }

  const handleSortChange = (mode) => {
    setSortMode(mode)
    setSortDropdownOpen(false)
  }

  const sortConsultations = (consultations, mode) => {
    switch (mode) {
      case "dateAsc":
        return consultations.sort((a, b) => new Date(a.date) - new Date(b.date))
      case "dateDesc":
        return consultations.sort((a, b) => new Date(b.date) - new Date(a.date))
      case "titleAsc":
        return consultations.sort((a, b) => a.title.localeCompare(b.title))
      case "titleDesc":
        return consultations.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return consultations
    }
  }

  const generatePDF = (consultation) => {
    const doc = new jsPDF()
    doc.text(`Consultation: ${consultation.title}`, 10, 10)
    doc.text(`Type: ${consultation.type}`, 10, 20)
    doc.text(`Location: ${consultation.location}`, 10, 30)
    doc.text(`Date: ${consultation.date}`, 10, 40)
    doc.text(`Doctor: ${consultation.doctor}`, 10, 50)
    doc.text(`Info: ${consultation.info}`, 10, 60)
    doc.save(`${consultation.title}.pdf`)
  }

  const filteredConsultations = consultations.filter(consultation =>
    consultation.motif.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedConsultations = sortConsultations(filteredConsultations, sortMode)

  return (
    <div className="min-h-screen bg-[#e6f2ff] relative">
      <Navbar tab="Dossier Medical" />
      <div className="flex justify-between p-4">
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
        <div className="relative">
      <Button
        className="flex items-center justify-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
      >
        <FaSort />
        <span>Trier</span>
      </Button>
      {sortDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("dateAsc")}
          >
            Date (Ascendant)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("dateDesc")}
          >
            Date (Descendant)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("titleAsc")}
          >
            Titre (A-Z)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("titleDesc")}
          >
            Titre (Z-A)
          </button>
        </div>
          )}
        </div>
      </div>
      <div className={`flex justify-center my-4 ${showInfo ? "blur" : ""}`}>
        <div className="relative w-full max-w-md">
          <Input
            type="search"
            placeholder="Rechercher une consultation"
            className="search-input pl-10 pr-4 py-2 rounded-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch
            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          />
        </div>
      </div>
      <div className={`space-y-4 p-4 ${showInfo ? "blur" : ""}`}>
        {sortedConsultations.map((consultation) => (
          <Card
            key={consultation.id}
            className={`p-4 rounded-lg shadow-md ${
              searchTerm.toLowerCase().includes(consultation.motif.toLowerCase()) ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <CardContent>
                <div className="flex items-center">
                  <h2 className={`text-xl font-semibold ${searchTerm.toLowerCase().includes(consultation.motif.toLowerCase()) ? "text-white" : "text-[#1877F2]"}`}>
                    {consultation.title}
                  </h2>
                  <button
                    className="ml-2 text-sm text-gray-500 underline"
                    onClick={() => handleInfoClick(consultation)}
                  >
                    Info
                  </button>
                </div>
                  <p className="text-md font-semibold">Consultation du:</p>
                  <p className="text-md">{consultation.date}</p>
                  {expandedConsultations.includes(consultation.id) && (
                    <div className="mt-2">
                      <p className="text-md">{consultation.info}</p>
                      <p className="text-md  mt-2">
                        <span className="font-bold">Médecin:</span> {medecins[consultation.medecin]}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Motif de Consultation:</span> {consultation.motif}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Antécédents Personnels:</span> {consultation.antecedentPersonnel?.type} - {consultation.antecedentPersonnel?.specification} 
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Antécédents Familials:</span> {consultation.antecedentFamilial?.typeAntFam} - {consultation.antecedentFamilial?.autre} 
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Interrogatoire:</span> {consultation.interrogatoire}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Examen Clinique Biologique et Radiologique:</ span> {consultation.examenMedicals.map((examen, i) => (
           examen.specificationExamen && (
            <div key={i}>
              <p>Type d'examen: {examen.typeExamen}</p>
              <p>Spécification: {examen.specificationExamen}</p>
              <p>Autre spécification: {examen.autreSpecification || 'N/A'}</p>
            </div>
          )
        ))}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Conseils et Recomendations:</span> {consultation.conseils}
                      </p>
                  </div>
                )}
              </CardContent>
              <div>
                
                <p className={`text-sm ${searchTerm.toLowerCase().includes(consultation.motif.toLowerCase()) ? "text-white" : "text-gray-500"}`}>
                  {consultation.date}
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="text-blue-500 underline"
                onClick={() => handleExpandClick(consultation.id)}
              >
                {expandedConsultations.includes(consultation.id) ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button
                className="text-blue-500 underline"
                onClick={() => generatePDF(consultation)}
              >
                <FaDownload />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {showInfo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-3/4">
            <h2 className="text-xl font-semibold">{selectedConsultation.title}</h2>
            <p className="text-md">{selectedConsultation.info}</p>
           
            <p className="text-md mt-2">
              <span className="font-bold">Médecin:</span> {medecins[selectedConsultation.medecin]}
            </p>
            <p className="text-md">
              <span className="font-bold">Motif:</span> {selectedConsultation.motif}
            </p>
            <p className="text-md">
              <span className="font-bold">Antécédents Personnels:</span> {selectedConsultation.antecedentPersonnel?.type} - {selectedConsultation.antecedentPersonnel?.specification}
            </p>
            <p className="text-md">
              <span className="font-bold">Antécédents Familials:</span> {selectedConsultation.antecedentFamilial?.typeAntFam} - {selectedConsultation.antecedentPersonnel?.autre}
            </p>
            <p className="text-md">
              <span className="font-bold">Interrogatoire:</span> {selectedConsultation.interrogatoire}
            </p>
            <p className="text-md">
               <span className="font-bold">Examen Clinique Biologique et Radiologique:</ span> {selectedConsultation.examenMedicals.map((examen, i) => (
          examen.specificationExamen && (
            <div key={i}>
              <p>Type d'examen: {examen.typeExamen}</p>
              <p>Spécification: {examen.specificationExamen}</p>
              <p>Autre spécification: {examen.autreSpecification || 'N/A'}</p>
            </div>
          )
        ))}
            </p>
            <p className="text-md">
              <span className="font-bold">Conseils et Recomendations:</span> {selectedConsultation.conseils}
            </p>
            
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
              onClick={handleCloseInfo}
            >
              Fermer
            </button>
          </div>
        </div>
)}

    </div>
  );
}

