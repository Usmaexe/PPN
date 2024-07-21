import React from 'react';

import Live_Tracker_Card from '@/components/ies/ui/cards/live-tracker-card';

const liveItems = [
    { title: 'Introduction à la Télémédecine 3', planificationDate: '2024-12-15T10:00:00' },
    { title: 'Introduction à la Télémédecine 2', planificationDate: '2024-08-15T10:00:00' },
    { title: 'Introduction à la Télémédecine 1', planificationDate: '2024-08-10T14:30:00' },
    { title: 'Les Avancées de la Chirurgie Robotique', planificationDate: '2024-08-05T09:00:00' },
    { title: 'Gestion des Maladies Chroniques 2', planificationDate: '2024-07-24T16:45:00' },
    { title: 'Gestion des Maladies Chroniques 1', planificationDate: '2024-07-19T08:15:00' },
    { title: 'Prévention et Vaccination', planificationDate: '2024-07-10T11:30:00' },
    { title: 'Santé Mentale et Bien-être', planificationDate: '2024-07-04T13:00:00' },
    { title: 'Technologies de la Santé Connectée', planificationDate: '2024-06-30T07:45:00' },
    { title: 'Nutrition et Santé', planificationDate: '2024-06-29T10:15:00' },
    { title: 'Réhabilitation Cardiaque', planificationDate: '2024-06-11T12:00:00' },
    { title: 'Soins Palliatifs', planificationDate: '2024-05-22T15:30:00' },
    { title: 'Innovation en Thérapie Génique', planificationDate: '2024-05-12T14:00:00' },
];

const Live_Planification_Tracker = ({ showModifyLivePlanification, setStatus, isItForAdmin, showAskQuestion }) => {
    return (
        <>
            <h4 className="card-title d-inline-block custom-timeline-title" style={{ marginLeft: '20px', color: 'black' }}>
                Lives planifiés pour 2024/2025
            </h4>
            <div className="d-flex gap-3" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
                {liveItems.map((item, index) => (
                    <Live_Tracker_Card key={index} item={item} showModifyLivePlanification={showModifyLivePlanification} setStatus={setStatus} isItForAdmin={isItForAdmin} showAskQuestion={showAskQuestion} />
                ))}
            </div>
        </>
    );
};

export default Live_Planification_Tracker;