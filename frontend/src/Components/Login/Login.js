import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addToken, addUser } from '../../Redux/actionCreators'
import { baseUrl } from '../../Shared/baseUrl'
import axios from 'axios'


const mapDispatchToProps = (dispatch) => ({
    addToken: () => dispatch(addToken()),
    addUser: () => dispatch(addUser())
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };

        const userWithToken = await axios.post(baseUrl + '/login', data)

        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLoginOnEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="container">

                <div className="card">

                    <div className="card-image">
                        <h1 className="card-heading">City Tours</h1>
                    </div>

                    
                    <label className="input-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        v-model="user.username"
                        onChange={this.handleInputChange}
                        required
                    />
                    <label className="input-label">Password</label>
                    <input
                        type="password"y
                        id="password"
                        name="password"
                        className="form-control"
                        v-model="user.password"
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleLoginOnEnter}
                        required
                    />

                    <div className="action">
                        <button type="submit" className="action-button" onClick={this.handleLogin}>Sign in</button>
                    </div>
                    <div className="card-info">
                        <Link to="/register">Need an account?</Link>
                    </div>
                </div>
            </div>



            //-----------------------------------------------------------------------------------------

            // <div className="container">
            //     <h1>Please Sign In</h1>
            //     <label class="sr-only">Username</label>
            //     <input
            //         type="text"
            //         id="username"
            //         name="username"
            //         class="form-control"
            //         placeholder="Username"
            //         v-model="user.username"
            //         onChange={this.handleInputChange}
            //         required
            //     />
            //     <label class="sr-only">Password</label>
            //     <input
            //         type="password"
            //         id="password"
            //         name="password"
            //         class="form-control"
            //         placeholder="Password"
            //         v-model="user.password"
            //         onChange={this.handleInputChange}
            //         required
            //     />
            //     <Link to="/register">Need an account?</Link>
            //     <button type="submit" onClick={this.handleLogin}>Sign in</button>
            // </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));

