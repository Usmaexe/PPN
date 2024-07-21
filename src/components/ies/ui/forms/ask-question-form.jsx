'use client'

import React, { useEffect, useRef } from 'react'

import Link from 'next/link';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

const Ask_Question_Form = ({ showDashboard }) => {
	let alertifyRef = useRef(null);

	useEffect(() => {
		const loadAlertify = async () => {
			try {
				const alertify = await import('alertifyjs');
				alertifyRef.current = alertify;
			} catch (error) {
				console.error('Error loading alertifyjs:', error);
			}
		};

		loadAlertify();
	}, []);

	const alert = (event) => {
		if (typeof alertifyRef.current === null) return;

		event.preventDefault();

		// Depending on what happened
		alertifyRef.current.success(`<strong>Succès: </strong> votre question a été envoyée.`);
		alertifyRef.current.error(`<strong>Erreur: </strong> veuillez réessayer.`);
	}

	return (
		<div className="main-wrapper">
			<div className="page-wrapper custom-wrapper">
				<div className="content">
					{/* Page Header */}
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
									<li className="breadcrumb-item active">Posez une question</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<form>
										<div className="row ">
											<div className="col-12">
												<div className="form-heading">
													<h4 style={{ marginBottom: "5px" }}>Posez une question sur la thématique: X</h4>
													<h5 style={{ marginBottom: "20px" }}>Pour le prochain Live</h5>
												</div>
											</div>

											<div className="col-12 col-sm-12">
												<div className="input-block local-forms">
													<textarea className="form-control mb-4" rows="3" cols="30"></textarea>
												</div>
											</div>

											<div className="col-12">
												<div className="doctor-submit text-end">
													<button type="submit" className="btn btn-primary submit-form me-2" onClick={alert}>Soumettre</button>
													<button type="submit" className="btn btn-primary cancel-form">Annuler</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Ask_Question_Form;