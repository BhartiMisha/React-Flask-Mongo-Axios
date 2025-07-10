import React, { Component } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

function withRouter(Component) {
    return function Wrapper(props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
}

class ListUserComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            if(res.data == null) {
                this.props.navigate('/add-user/_add');
            }
            this.setState({users:res.data});
        });
    }

    addUser() {
        this.props.navigate(`/add-user/_add`);
    };

    editUser(userId) {
        this.props.navigate(`/add-user/${userId}`);
    };

    viewUser(userId){
        this.props.navigate(`/view-user/${userId}`);
    }

    deleteUser(userId) {
        UserService.deleteUser(userId)
        .then((res) => {
            this.setState({users: this.state.users.filter(user => user.id !== userId)});
            console.log("User deleted successfully");
        })
        .catch(error => {
            console.error("There was an error deleting the user!", error);
        });
    };

    render(){
        return(
            <div>
                <h2 className='text-center'>
                    User List
                </h2>
                <div className='row'>
                    <button onClick={this.addUser} className='btn btn-primary'>Add User</button>
                </div>
                <br></br>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>User First Name</th>
                            <th>User Last Name</th>
                            <th>User Email ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailId}</td>
                                    <td>
                                        <button onClick={() => this.editUser(user.id)} className='btn btn-info'>Update</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => this.viewUser(user.id)} className='btn btn-secondary'>View</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(ListUserComponent);