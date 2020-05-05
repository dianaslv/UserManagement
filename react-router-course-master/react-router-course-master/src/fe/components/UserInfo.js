import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { name: '' }, username:'' };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({username: params.username});
    axios.get(`/api/users/${params.userId}`)
      .then(({ data: user }) => {
          console.log(user);
        this.setState({ user });
      });
  }

  handleDelete() {
    const { match: { params }, history} = this.props;
    const {username} = this.state;
    axios.delete(`/api/users/${params.userId}`)
      .then(() => {
        console.log('user deleted');
        history.push(`/reservations/${username}/${params.userId}/edit`);
      });
  }

  render() {
    const { user, username } = this.state;

    return (
      <Modal open dimmer="blurring">
        <Helmet>
          <title>{user.name}</title>
        </Helmet>

        <Modal.Header>{user.name}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="small" src={`https://api.adorable.io/avatars/250/${user.email}`} />
          <Modal.Description>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Link to={`/reservations/${username}/${user.id}/edit`}>
          <Button positive>Edit</Button>
                </Link>
          <Button negative onClick={this.handleDelete}>Delete</Button>
          <Link to={`/reservations/${username}`}>
            <Button>Close</Button>
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserInfo;
