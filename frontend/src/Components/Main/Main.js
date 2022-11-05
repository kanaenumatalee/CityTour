import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Itinerary from '../Itinerary/Itinerary'
import Create from '../Itinerary/Create'


const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser()) }
});



class Main extends Component {
    // constructor(props){
    //     super(props);
    // }
    
    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }
    
    render(){
        return(
            <div>
                {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/itinerary'>Itinerary | </Link>
                            <Link to='/itinerary/create'>Create | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>
                        </div>  
                    : 
                        <Link to='/login'>Home</Link>
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                    <Route exact path='/itinerary' component={this.props.token.token !== undefined ? () => <Itinerary/> : null}/>
                    <Route exact path='/itinerary/create' component={() => <Create/>}/>
                    <Redirect to='/login'/>
                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));