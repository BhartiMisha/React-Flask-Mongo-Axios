import React, { Component } from 'react';
import UserService from '../services/UserService';
import { useParams, useNavigate } from 'react-router-dom';

function withRouter(Component) {
    return function Wrapper(props) {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    }
}

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return;
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId: user.emailId
                });
            });
        }
    }

    changeFirstNameHandler(e) {
        this.setState({ firstName: e.target.value });
    }

    changeLastNameHandler(e) {
        this.setState({ lastName: e.target.value });
    }

    changeEmailHandler(e) {
        this.setState({ emailId: e.target.value });
    }

    saveOrUpdateUser(e) {
        e.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };

        if (this.state.id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.navigate('/users');
            });
        } else {
            UserService.updateUser(this.state.id, user).then(res => {
                this.props.navigate('/users');
            });
        }
    }

    cancel() {
        this.props.navigate('/users');
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mt-4">User Form</h2>
                        <form>
                            <div className="form-group mb-3">
                                <label>First Name</label>
                                <input type="text" className="form-control" placeholder="Enter First Name" value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                            </div>
                            <div className="form-group mb-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.changeLastNameHandler} />
                            </div>
                            <div className="form-group mb-3">
                                <label>Email ID</label>
                                <input type="email" className="form-control" placeholder="Enter Email ID" value={this.state.emailId} onChange={this.changeEmailHandler} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.saveOrUpdateUser}>Submit</button>
                            <button type="button" className='btn btn-secondary' onClick={this.cancel} style={{ marginLeft: "10px"}}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        )   
    }
}

export default withRouter(CreateUserComponent);