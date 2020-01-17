import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Switch, Route} from 'react-router-dom'
import NavigationBar from './containers/NavigationBar'
import Homepage from './components/Homepage'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import ChildPage from './containers/ChildPage'
import NewChildForm from './components/NewChildForm'
import {connect} from 'react-redux'
// import ChildPage from './containers/ChildPage'





class App extends Component {
  componentDidMount(){
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
  }
  
  render(){
    return (
      <div>
      {this.props.hasFetched?
      <NavigationBar/>
      :
      null}
      <Switch>
        <Route exact path="/homepage" component={Homepage} />
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/sign_up" component={SignUp}/>
        <Route exact path="/add_child" component={NewChildForm}/>
        <Route path="/:id" component={ChildPage}/>
      </Switch>
     </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasFetched: state.currentUser.hasFetched
  }
}

export default connect(mapStateToProps)(App);
