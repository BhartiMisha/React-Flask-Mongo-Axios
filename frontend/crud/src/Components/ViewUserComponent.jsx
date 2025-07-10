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

class ViewUserComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            user: {}
        }

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            this.setState({user: res.data});
        });
    }

    goBack() {
        this.props.navigate('/users');
    }

    render(){
        return(
            <div>
                <h2 className='text-center'>
                    View User Details
                </h2>
                <br></br>
                <div className='row mb-2'>
                    <label className='col-sm-4 col-form-label'>First Name: </label>
                    <div className='col-sm-8'>{this.state.user.firstName}</div>
                </div>
                <div className='row mb-2'>
                    <label className='col-sm-4 col-form-label'>Last Name: </label>
                    <div className='col-sm-8'>{this.state.user.lastName}</div>
                </div>
                <div className='row mb-2'>
                    <label className='col-sm-4 col-form-label'>Email ID: </label>
                    <div className='col-sm-8'>{this.state.user.emailId}</div>
                </div>
                <div className='row'>
                    <button onClick={this.goBack} className='btn btn-primary'>Go Back</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewUserComponent);