import { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { addToken, deleteUser } from "../../Redux/actionCreators";
import Router from "../Routers/Router";



const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },
});



class Main extends Component {
  render() {
    return (
        <Router user={mapStateToProps} />
    );
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));