import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'; 

export const AllOutput = () => {
  const [scans, setScans] = useState([]);
  const [selectedIp, setSelectedIp] = useState('');
  const [filesForIp, setFilesForIp] = useState({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/scans')
      .then(response => response.json())
      .then(data => {
        setScans(data);
        const uniqueIps = [...new Set(data.map(scan => scan.ip))];
        const filesByIp = {};
        uniqueIps.forEach(ip => {
          filesByIp[ip] = data.filter(scan => scan.ip === ip).map(scan => scan.fileName);
        });
        setFilesForIp(filesByIp);
      })
      .catch(err => console.error('Error fetching scans:', err));
  }, []);

  const handleIpClick = (ip) => {
    setSelectedIp(ip);
    setSelectedFileName('');
    setFileContent('');
  };
  const handleFileClick = (fileName) => {
    // Trouver le fichier correspondant dans la liste des scans
    const scan = scans.find(scan => scan.ip === selectedIp && scan.fileName === fileName);
    
    // Vérifier si le scan correspondant a été trouvé
    if (scan) {
      setSelectedFileName(fileName);
      setFileContent(scan.content);
      console.log(scan.content);
    }
  };
  
  return (
    <div className="content">
      <Row>
        <Col md="3">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Adresses IP</CardTitle>
            </CardHeader>
            <CardBody>
              <Nav vertical>
                {Object.keys(filesForIp).map((ip, index) => (
                  <NavItem key={index}>
                    <NavLink onClick={() => handleIpClick(ip)}>
                      {ip}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          {selectedIp && (
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Fichiers</CardTitle>
              </CardHeader>
              <CardBody>
                <Nav vertical>
                  {filesForIp[selectedIp].map((fileName, index) => (
                    <NavItem key={index}>
                      <NavLink onClick={() => handleFileClick(fileName)}>
                        {fileName}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </CardBody>
            </Card>
          )}
        </Col>
        <Col md="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Contenu du fichier</CardTitle>
            </CardHeader>
            <CardBody>
              {selectedFileName && (
                <div>
                  <h3>Contenu du fichier {selectedFileName} :</h3>
                  <pre>{fileContent}</pre>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AllOutput;
