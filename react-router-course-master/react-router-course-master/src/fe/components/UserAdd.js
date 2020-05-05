import React from 'react';
import { post } from 'axios';
import UserForm from './UserForm';
import { Helmet } from 'react-helmet';
import Page from './Page';
import Navbar from "./Cms/Navbar";

class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state ={ username:''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
      const {match: {params}} = this.props;
      this.setState({username: params.username});
  }

    handleSubmit(user) {
      const {username} = this.state;
      post('/api/users', user)
      .then(({ data: u }) => {
        const { history } = this.props;
        history.push(`/reservations/${username}/${u.id}/info`);
      });
  }

  handleCancel(e) {
      const {username} = this.state;
      e.preventDefault();
      const { history } = this.props;
      history.push(`/reservations/${username}`);
      console.log('action canceled');
  }

  render() {
      const {username} = this.state;
    return (
      <Page title="Add reservation" columns={3}>
        <Helmet>
          <title>CMS | Add reservation</title>
        </Helmet>
          <Navbar username={username}/>
        <UserForm
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
        />
      </Page>
    );
  }
}

export default UserAdd;
