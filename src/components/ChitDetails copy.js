import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function ChitDetails() {
  const [member, setMember] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [chits, setChits] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chits"), orderBy("member"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chitsData = [];
      snapshot.forEach((doc) => chitsData.push({ id: doc.id, ...doc.data() }));
      setChits(chitsData);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!member || !phone || !amount) return alert("Please fill all fields");
    await addDoc(collection(db, "chits"), {
      member,
      phone,
      amount: Number(amount),
      status,
    });
    setMember("");
    setPhone("");
    setAmount("");
    setStatus("Active");
  };

  return (
    <Container>
      <h2>Chit Details</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="formMemberName">
          <Form.Label>Member Name</Form.Label>
          <Form.Control
            type="text"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            placeholder="Enter member name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Chit Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter chit amount"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Chit Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Closed</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Chit
        </Button>
      </Form>

      <h3>Existing Chits</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Member</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {chits.map(({ id, member, phone, amount, status }) => (
            <tr key={id}>
              <td>{member}</td>
              <td>{phone}</td>
              <td>{amount}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ChitDetails;