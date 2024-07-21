"use client"

import React, { useState } from "react";

import Carousel from "@/components/ies/ui/carousel";
import Live_Timeline from "@/components/ies/ui/live-timeline";
import List_Lives from "@/components/ies/ui/list-lives";
import Ask_Question_Form from "@/components/ies/ui/forms/ask-question-form";
import Live_Planification_Tracker from "@/components/ies/ui/live-planification-tracker";
import Post_Live_Form from "@/components/ies/ui/forms/post-live-form";
import Post_Live_Banner from "@/components/ies/ui/banners/post-live-banner";

import { carouselSlides } from "@/components/ies/utility/carousel-slides";




import Navbar from "@/components/Navbar";




const tabNames = {
    dashboard: 0,
    askQuestion: 1,
    postLiveForm: 2,
    listLives: 3,
    modifyLivePlanification: 4
};

const Youth_Dashboard = ({ name }) => {
    const [selectedTab, setSelectedTab] = useState(tabNames.dashboard);

    const showDashboard = () => { setSelectedTab(tabNames.dashboard); };
    const showAskQuestion = () => { setSelectedTab(tabNames.askQuestion); };
    const showPostLiveForm = () => { setSelectedTab(tabNames.postLiveForm); };
    const showListLives = () => { setSelectedTab(tabNames.listLives); };
    const showModifyLivePlanification = () => { setSelectedTab(tabNames.modifyLivePlanification); };

    const [liveCardStatus, setLiveCardStatus] = useState(null);

    return (
        <>
            <Post_Live_Banner showPostLiveForm={showPostLiveForm} />

            {(selectedTab === tabNames.dashboard) &&
                <div className="page-wrapper custom-wrapper-full-size mt-0 pt-0">
                    <div className="content d-xl-flex p-xl-0 py-0 my-0 pt-0 mt-0">
                        <div className="col-auto col-xl-8 mx-auto mt-md-0 pt-md-4" style={{ paddingBottom: '40px' }}>
                            <div className="page-header mt-md-0" style={{ marginLeft: '30px' }}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                {/* <Link href="#"> Dashboard </Link> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="good-morning-blk">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="morning-user">
                                            <h2>
                                                Bonjour, <span>{name}</span>
                                            </h2>
                                            <p>Bienvenue dans votre espace IES</p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-auto mx-auto mb-4">
                                <div className="row gap-2 mx-auto">
                                    <a
                                        href="#"
                                        className="btn btn-primary col-md d-flex justify-content-between align-items-center custom-button-ies"
                                        onClick={showListLives}
                                    >
                                        <span>Voir les Lives précédents {" "} </span><i className="fa fa-list" />
                                    </a>
                                </div>
                            </div>

                            <div style={{ paddingTop: '4px', marginBottom: '30px' }}><Live_Planification_Tracker showModifyLivePlanification={showModifyLivePlanification} setStatus={setLiveCardStatus} isItForAdmin={false} showAskQuestion={showAskQuestion} /></div>

                            <div style={{ paddingTop: '4px', paddingBottom: '4px' }}><Carousel slides={carouselSlides} /></div>
                        </div>

                        <Live_Timeline />
                    </div>
                </div>
            }
            {(selectedTab === tabNames.postLiveForm) && <Post_Live_Form showDashboard={showDashboard} />}
            {(selectedTab === tabNames.askQuestion) && <Ask_Question_Form showDashboard={showDashboard} />}
            {(selectedTab === tabNames.listLives) && <List_Lives showDashboard={showDashboard} />}
        </>
    );
};

export default Youth_Dashboard;

