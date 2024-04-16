import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dashboard(props) {
  const [vulnerabilities, setVulnerabilities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_data");
        console.log(response)

        const vulnerabilitiesArray = response.data.map(item => ({
          exploitLine: item.exploitLine,
          description: item.description,
          path: item.path,
          port: item.port
        }));

        setVulnerabilities(vulnerabilitiesArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Vulnérabilités</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Exploit Line</th>
                      <th>Description</th>
                      <th>Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vulnerabilities.map((vulnerability, index) => (
                      <tr key={index}>
                        <td>{vulnerability.exploitLine}</td>
                        <td>{vulnerability.description}</td>
                        <td>{vulnerability.path}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
