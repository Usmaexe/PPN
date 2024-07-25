"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Image from "next/image";
import "@/assets/css/links.css";
import "@/assets/css/center.module.css";
import "@/assets/css/hist.css";
import {
  teeth,
  consultation,
  eye
} from "@/components/imagepath";
import { useRouter } from 'next/navigation';
import { handleGenerateDocument } from "../page";

const Historique = ({ params }) => {
  const [consultations, setConsultations] = useState([]);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jeunes/${id}`);
        const data = await response.json();
        setConsultations(data.dossierMedial.historiqueConsultations);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchConsultations();
  }, [id]);

  const handleModify = () => {
    router.push("Consultation/modifier");
  };

  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={["Patients", "Patient", "Historique"]} currentPage="Historique" />

          <div className="row hist-row">
            <div className="col-md-12 hist-card">
              <div className="card">
                <div className="card-body">
                  <ul className="timeline">
                    {consultations.map(consultation => (
                      <li key={consultation.id} className={consultation.id % 2 === 0 ? "timeline-inverted" : ""}>
                        <button className="timeline-badge activity-boxs comman-flex-center"
                          data-bs-toggle="modal"
                          data-bs-target="#con-close-modal">
                          <Image
                            src={consultation.motif.includes("Bucco-dentaire") ? teeth : eye} // Remplacez selon vos besoins
                            style={{ width: "50%", height: "50%" }}
                            height={50}
                            alt="#"
                          />
                        </button>

                        <button className="timeline-panel"
                          data-bs-toggle="modal"
                          data-bs-target="#con-close-modal">
                          <div className="timeline-heading">
                            <h5 className="">Date : {consultation.date}</h5>
                          </div>
                          <div className="timeline-body">
                            <p>Motif : {consultation.motif}</p>
                            <p>Examen : {consultation.examenClinique}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      <div
        id="con-close-modal"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header p-4">
              <Image
                src={consultation}
                alt="#"
                style={{width:"7%",height:"7%"}}
              />
              <h4 className="modal-title">Consultation XXXX</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <div class="row">
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="motif" class="form-label">Motif</label>
                          <input readOnly value="Bucco-dentaire" type="text" class="form-control" id="motif" />
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="ant" class="form-label">Antecedants</label>
                          <input readOnly value="Personnel - Medical - Diabète" type="text" class="form-control" id="ant" />
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Historique Clinique</label>
                          <textarea class="form-control" id="field-historique" 
                            value = "L'historique clinique regroupe les antécédents médicaux d'un patient"
                          ></textarea>
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Examen Clinique</label>
                          <textarea class="form-control" id="field-clinique" 
                          value = "L'examen clinique est une évaluation physique du patient réalisée par un professionnel de la santé."></textarea>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="motif" class="form-label">Examen Medicaux</label>
                          <input readOnly value="Biologique - NFS" type="text" class="form-control" id="examen-medicaux" />
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="ant" class="form-label">Diagnostic Positif</label>
                          <input readOnly value="Tele-Expertise" type="text" class="form-control" id="ant" />
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Ordonnance</label>
                          <textarea class="form-control" id="field-historique" value = "Ordonnance .." ></textarea>
                      </div>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary waves-effect btn-imprimer"
                data-bs-dismiss="modal"
                onClick={handleGenerateDocument}
              >
                Imprimer
              </button>
              <button
                type="button"
                className="btn btn-info btn-modifier"
                data-bs-dismiss="modal"
                onClick={handleModify}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Historique;
