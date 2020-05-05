import React from 'react';
import axios, { get, patch } from 'axios';
import { Helmet } from 'react-helmet';
import UserForm from './UserForm';
import Page from './Page';
import Navbar from "./Cms/Navbar";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { name: '' }, username:'' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({username:params.username});
    get(`/api/users/${params.userId}`)
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  handleSubmit(user) {
      const { username } = this.state;
    patch(`/api/users/${user.id}`, user)
      .then(() => {
        this.setState({ user });

        console.log('updated:', user);
        const { history } = this.props;

        history.push(`/reservations/${username}/${user.id}/info`);
      });
  }

  handleCancel(e) {
    e.preventDefault();
      const { username } = this.state;

      console.log('you have canceled');
      const {history} = this.props;
      history.push(`/reservations/${username}`);
  }

  render() {
    const { user, username } = this.state;

    return (
      <Page title="Edit reservation" columns={3}>
        <Helmet>
          <title>Reservation {user.name}</title>
        </Helmet>
          <Navbar username={username}/>
        <UserForm
          user={user}
          submitText="Update"
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Page>
    );
  }
}

export default UserEdit;
