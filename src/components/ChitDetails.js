import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Card } from "react-bootstrap";

function ChitDetails() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [flat, setFlat] = useState("");
  const [appartment, setAppartment] = useState("");
  const [status, setStatus] = useState("Active");
  const [chits, setChits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/chits.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load chits data');
        }
        return response.json();
      })
      .then(data => {
        setChits(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading chits:', error);
        setLoading(false);
        setChits([]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !mobileNumber || !flat || !appartment) {
      return alert("Please fill all fields");
    }
    
    const newChit = {
      id: Date.now().toString(),
      "S.No": chits.length + 1,
      Name: name,
      "Mobile number": Number(mobileNumber),
      Flat: flat,
      Appartment: appartment,
      Status: status,
    };
    
    setChits(prev => [...prev, newChit]);
    setName("");
    setMobileNumber("");
    setFlat("");
    setAppartment("");
    setStatus("Active");
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div>Loading chits data...</div>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Chit Details</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFlat">
          <Form.Label>Flat</Form.Label>
          <Form.Control
            type="text"
            value={flat}
            onChange={(e) => setFlat(e.target.value)}
            placeholder="Enter flat (e.g., G4)"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAppartment">
          <Form.Label>Apartment</Form.Label>
          <Form.Control
            type="text"
            value={appartment}
            onChange={(e) => setAppartment(e.target.value)}
            placeholder="Enter apartment name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Closed</option>
            <option>Inactive</option>
          </Form.Select>
        </Form.Group>
        
        <Button type="submit" variant="primary">
          Add Chit
        </Button>
      </Form>

      <h3>Existing Chits</h3>
      
      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <Table responsive striped bordered hover className="mb-0">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Flat</th>
              <th>Apartment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {chits.map((chit) => (
              <tr key={chit.id}>
                <td>{chit["S.No"]}</td>
                <td>{chit.Name}</td>
                <td>{chit["Mobile number"]}</td>
                <td>{chit.Flat}</td>
                <td>{chit.Appartment}</td>
                <td>
                  <span className={`badge bg-${chit.Status === 'Active' ? 'success' : chit.Status === 'Closed' ? 'danger' : 'secondary'}`}>
                    {chit.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        {chits.map((chit) => (
          <Card key={chit.id} className="mb-3 shadow-sm">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-1 fw-bold">S.No: {chit["S.No"]}</h6>
                <span className={`badge bg-${chit.Status === 'Active' ? 'success' : chit.Status === 'Closed' ? 'danger' : 'secondary'}`}>
                  {chit.Status}
                </span>
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <strong>Name:</strong> {chit.Name}
                </div>
                <div className="col-6">
                  <strong>Flat:</strong> {chit.Flat}
                </div>
                <div className="col-6">
                  <strong>Mobile:</strong><br className="d-md-none" />
                  <small>{chit["Mobile number"]}</small>
                </div>
                <div className="col-6">
                  <strong>Apartment:</strong><br className="d-md-none" />
                  <small>{chit.Appartment}</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ChitDetails;
