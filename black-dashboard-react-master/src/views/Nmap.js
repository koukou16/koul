import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardHeader, CardBody, CardTitle } from "reactstrap";

function Nmap() {
  const [nmapData, setNmapData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_nmap")
      .then(response => {
        setNmapData(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données Nmap :", error);
      });
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="content">
      <Nav tabs>
        {Object.keys(nmapData).map((service, index) => (
          <NavItem key={index}>
            <NavLink
              className={activeTab === service ? "active" : ""}
              onClick={() => toggle(service)}
            >
              {service}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {Object.keys(nmapData).map((service, index) => (
          <TabPane key={index} tabId={service}>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">{service.toUpperCase()} Détails</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p>State: {nmapData[service].state}</p>
                    <p>Version: {nmapData[service].version}</p>
                    <p>Details: {nmapData[service].details}</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}

export default Nmap;
