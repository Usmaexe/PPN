import React, { useEffect, useState } from 'react';

import { daysForQuestions, daysFoSending, daysBeforeAutoInform } from '@/components/ies/utility/period-delays';
import dayjs from 'dayjs';

const getStatusAndColor = (timeLeftMinutes) => {
    if (timeLeftMinutes < 0) return ['Terminé', '#333333'];
    if (timeLeftMinutes <= daysFoSending * 24 * 60) return ['Questions envoyés', '#385AFE'];
    if (timeLeftMinutes <= (daysFoSending + daysForQuestions) * 24 * 60) return ['Questions des jeunes', '#388E3C'];
    return ['Avant-Questions des jeunes', '#CC0000'];
};

const Live_Tracker_Card = ({ item, isItForAdmin, setStatus, showModifyLivePlanification, showAskQuestion }) => {
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        setCurrentTime(dayjs());
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!currentTime) {
        return null; // or a loading spinner? maybe later
    }

    const eventDay = dayjs(item.planificationDate);

    const timeLeftMinutes = eventDay.diff(currentTime, 'minute');
    const timeLeftForPhaseMinutes = timeLeftMinutes > 0
        ? (timeLeftMinutes > (daysFoSending + daysForQuestions) * 24 * 60
            ? timeLeftMinutes - (daysFoSending + daysForQuestions) * 24 * 60
            : (timeLeftMinutes > daysFoSending * 24 * 60
                ? timeLeftMinutes - daysFoSending * 24 * 60
                : timeLeftMinutes))
        : 0;

    const [status, color] = getStatusAndColor(timeLeftMinutes);

    const formattedDate = eventDay.format('YYYY-MM-DD');
    const formattedTime = eventDay.format('HH:mm');

    return (
        (!(status === "Avant-Questions des jeunes" && !isItForAdmin) &&
            <div className="col-auto m-0" style={{ ...(isItForAdmin ? { cursor: 'pointer' } : {}) }} onClick={() => {
                if (!isItForAdmin) return;

                setStatus(status);
                showModifyLivePlanification();
            }}>
                <div className="blog grid-blog m-0" style={{ height: '100%' }}>
                    <div className="blog-content">
                        <div className="blog-grp-blk">
                            <div className="blog-img-blk">
                                <div className="content-blk-blog ms-1 mt-1">
                                    <h4><a href="#" style={{ fontSize: 'calc(0.9em + 0.08vw)', pointerEvents: 'none' }}>{item.title}</a></h4>
                                    <div style={{ width: '100%', marginInline: 'auto', borderBottom: '2px solid rgba(50, 55, 164, 1)', marginBottom: '8px', paddingTop: '8px' }}></div>
                                </div>
                            </div>
                            <span style={{ marginLeft: '50px', fontSize: 'calc(0.9em + 0.08vw)', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <i className="feather-calendar me-1"></i>{formattedDate}
                                <h4 style={{ color: 'black' }}>{formattedTime}</h4>
                            </span>
                        </div>
                        <h3 className="blog-title">Phase:
                            <span style={{ color: color, marginLeft: '10px', fontWeight: 'bold' }}>
                                {status}
                            </span>
                        </h3>
                        {(timeLeftMinutes > 0) && <>
                            <h3 className="blog-title">Temps restant dans la phase:
                                <span style={{ color: 'black', marginLeft: '10px', fontWeight: 'bold' }}>
                                    {`${Math.floor(timeLeftForPhaseMinutes / 1440)} jrs ${Math.floor((timeLeftForPhaseMinutes % 1440) / 60)}h ${timeLeftForPhaseMinutes % 60}m`}
                                </span>
                            </h3>
                            <h3 className="blog-title">Temps restant pour le Live:
                                <span style={{ color: 'black', marginLeft: '10px', fontWeight: 'bold' }}>
                                    {`${Math.floor(timeLeftMinutes / 1440)} jrs ${Math.floor((timeLeftMinutes % 1440) / 60)}h ${timeLeftMinutes % 60}m`}
                                </span>
                            </h3>
                        </>
                        }
                        {status === "Avant-Questions des jeunes" && isItForAdmin &&
                            <div className='d-flex gap-2'>
                                {(timeLeftMinutes > daysBeforeAutoInform * 24 * 60) && <a
                                    href="#"
                                    className={`btn btn-primary w-100 d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>Informer l&apos;intervenant </span><i className="fa fa-user-md" />
                                </a>}
                                <a
                                    href="#"
                                    className={`btn btn-primary w-100 d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span>Supprimer </span><i className="fa fa-trash" />
                                </a>
                            </div>
                        }
                        {status === "Questions des jeunes" && !isItForAdmin &&
                            <a
                                href="#"
                                className={`btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies custom-button-ies-question ${false ? 'custom-disabled' : ''}`}
                                onClick={showAskQuestion}
                            >
                                <span>Posez une question sur la thématique </span><i className="fa fa-question" />
                            </a>
                        }
                    </div>
                </div>
            </div>
        ));
};

export default Live_Tracker_Card;
