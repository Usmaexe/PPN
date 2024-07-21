import React, { useState, useEffect } from 'react';

import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import Live_Card from '@/components/ies/ui/cards/live-card';

const List_Lives = ({ showDashboard }) => {
  const [data, setData] = useState([])
  const [changeLoad, setChangeLoad] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setData([
        ...data,
        {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        },
        {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        }, {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        },
        {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        }, {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        },
        {
          name: "Julie Martin",
          spec: "M.B.B.S, Diabetologist",
          date: "05 Sep 2022",
          title: "Alimentation équilibrée pour les étudiants",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        }
      ]);
    }

    setTimeout(fetchData, 300);
  }, [changeLoad])

  const load = () => setChangeLoad(!changeLoad)

  return (
    <div className="main-wrapper">
      <div className="page-wrapper custom-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#" onClick={showDashboard}>Tableau de bord </a>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Lives</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Live_Card key={index} item={item} />
              ))
            ) : (
              <p>Données non disponibles</p>
            )}
            {data && data.length > 0 &&
              <div className="col-lg-12">
                <div className="invoice-load-btn">
                  <a className="btn" onClick={load}>
                    Charger plus de vidéos
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default List_Lives