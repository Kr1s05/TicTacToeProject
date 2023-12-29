import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactSwitch from "react-switch";
function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    switch: false,
  });
  function handleSwitchChange(checked: boolean) {
    setFormData({
      ...formData,
      switch: checked,
    });
  }
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
      <h3 className="text-center">Login</h3>
      <Form.Group className="my-4 px-1">
        <Form.Label
          htmlFor={formData.switch ? "formBasicUserEmail" : "formBasicUserName"}
        >
          {formData.switch ? "Email" : "Username"}
        </Form.Label>
        <ReactSwitch
          checked={formData.switch}
          onChange={handleSwitchChange}
          height={18}
          width={40}
          className="float-end"
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#888"
          id="switch"
        />
        <Form.Control
          type="text"
          placeholder="Enter username:"
          name="username"
          id="formBasicUserName"
          value={formData.username}
          onChange={handleInputChange}
          style={{ display: formData.switch ? "none" : "inline-block" }}
          autoComplete="on"
          size="lg"
        />
        <Form.Control
          type="email"
          placeholder="Enter email:"
          name="email"
          id="formBasicEmail"
          value={formData.email}
          onChange={handleInputChange}
          style={{ display: formData.switch ? "inline-block" : "none" }}
          autoComplete="on"
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
          autoComplete="on"
          size="lg"
        />
      </Form.Group>
      <Container fluid className="text-center">
        <Button variant="secondary" type="submit" className="mt-3" size="lg">
          Login
        </Button>
      </Container>
    </Form>
  );
}

export default LoginForm;
