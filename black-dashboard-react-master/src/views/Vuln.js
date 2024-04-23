import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

function Vuln(props) {
  const [activeTab, setActiveTab] = useState("http");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="content">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "http" ? "active" : ""}
            onClick={() => {
              toggle("http");
            }}
          >
            HTTP
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "smb" ? "active" : ""}
            onClick={() => {
              toggle("smb");
            }}
          >
            SMB
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "telnet" ? "active" : ""}
            onClick={() => {
              toggle("telnet");
            }}
          >
            Telnet
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="http">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">HTTP Vulnérabilités</CardTitle>
                </CardHeader>
                <CardBody>
                  {/* Contenu pour HTTP */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="smb">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">SMB Vulnérabilités</CardTitle>
                </CardHeader>
                <CardBody>
                  {/* Contenu pour SMB */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="telnet">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Telnet Vulnérabilités</CardTitle>
                </CardHeader>
                <CardBody>
                  {/* Contenu pour Telnet */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default Vuln;
