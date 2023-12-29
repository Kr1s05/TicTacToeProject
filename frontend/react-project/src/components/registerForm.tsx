import { ChangeEvent, FormEvent, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Process the form data (submit or perform other actions)
    console.log(formData);
  };
  return (
    <Form className="border border-3 rounded p-4 fs-6 " onSubmit={handleSubmit}>
      <h3 className="text-center">Register</h3>
      <Form.Group controlId="formBasicUsername" className="my-4 px-1">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username:"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          size="lg"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email:"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          size="lg"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="my-4 px-1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password:"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          size="lg"
        />
      </Form.Group>
      <Form.Group controlId="formBasicConfirmPassword" className="my-4 px-1">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password:"
          name="confirmPass"
          value={formData.confirmPass}
          onChange={handleInputChange}
          size="lg"
        />
      </Form.Group>
      <Container fluid className="text-center">
        <Button variant="secondary" type="submit" className="mt-3">
          Login
        </Button>
      </Container>
    </Form>
  );
}

export default RegisterForm;
