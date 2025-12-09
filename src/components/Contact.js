import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for contacting us, ${name}!`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Container>
      <h2>Contact</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="contactName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;