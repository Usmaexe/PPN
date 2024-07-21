/* eslint-disable */

import React from "react";
import Link from "next/link";

import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const quality = [
    { value: 1, label: "Très mauvais" },
    { value: 2, label: "Mauvais" },
    { value: 3, label: "Passable" },
    { value: 4, label: "Bon" },
    { value: 5, label: "Excellent" }
];

const yesno = [
    { value: 1, label: "Oui" },
    { value: 2, label: "Non" },
];

const Post_Live_Form = ({ showDashboard }) => {

    {/** TODO: Please check for input size control classes etc. */ }

    return (
        <>
            <div className="page-wrapper custom-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="#" onClick={showDashboard}>Tableau de bord </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Votre avis compte</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="col-12">
                                    <div className="form-heading">
                                        <h4>Ce que vous pensez du Live...</h4>
                                    </div>
                                </div>
                                <form action="#">
                                    <div className="input-block row mb-0">
                                        <label className="col-form-label col-md-4">Comment évalueriez-vous le Live? <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <Select
                                                options={quality}
                                                id="search-commodity"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}
                                                placeholder="Sélectionner une des réponses"
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
                                                        boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                                        '&:hover': {
                                                            borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                                                        },
                                                        borderRadius: '10px',
                                                        fontSize: "14px",
                                                        minHeight: "45px",
                                                    }),
                                                    dropdownIndicator: (base, state) => ({
                                                        ...base,
                                                        transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                                                        transition: '250ms',
                                                        width: '35px',
                                                        height: '35px',
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Recommanderiez-vous cette session à d'autres personnes? <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <Select
                                                options={yesno}
                                                id="search-commodity"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}
                                                placeholder="Sélectionner une des réponses"
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
                                                        boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                                        '&:hover': {
                                                            borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                                                        },
                                                        borderRadius: '10px',
                                                        fontSize: "14px",
                                                        minHeight: "45px",
                                                    }),
                                                    dropdownIndicator: (base, state) => ({
                                                        ...base,
                                                        transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                                                        transition: '250ms',
                                                        width: '35px',
                                                        height: '35px',
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Y a-t-il un sujet que vous aimeriez voir abordé en direct? </label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-heading">
                                            <h4 style={{ fontSize: "16px", marginBottom: "12px" }}>Exprimez-vous librement</h4>
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-12">
                                        <div className="input-block local-forms">
                                            <textarea className="form-control mb-4" rows="3" cols="30"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="doctor-submit text-end">
                                            <button type="submit" className="btn btn-primary submit-form me-2">Soumettre</button>
                                            <button type="submit" className="btn btn-primary cancel-form">Annuler</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post_Live_Form;
