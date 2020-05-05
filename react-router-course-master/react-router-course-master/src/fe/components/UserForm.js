import React from 'react';
import { Form } from 'semantic-ui-react';
import { Prompt } from 'react-router-dom';


class UserForm extends React.Component {
  constructor(props) {
    super(props);

    const { user = {} } = props;

    this.state = { user, formChanged: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    this.setState({ user });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;
    const { handleSubmit } = this.props;

    handleSubmit(user);

    this.setState({ user: {} });
  }

  handleChange(e, { name, value }) {
    const { user } = this.state;

    this.setState({ user: { ...user, [name]: value }, formChanged: true });
  }

  render() {
    const { user: { name, email, phone, address }, formChanged } = this.state;
    const { handleCancel, submitText = 'Create' } = this.props;

    return (

      <Form onSubmit={this.handleSubmit}>
        <Prompt when={formChanged} message="are u sure u wanna do that?" />
        <Form.Input
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Address"
          type="text"
          name="address"
          value={address}
          onChange={this.handleChange}
        />
        <Form.Group>
          <Form.Button type="submit">{submitText}</Form.Button>
          <Form.Button onClick={handleCancel}>Cancel</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default UserForm;

