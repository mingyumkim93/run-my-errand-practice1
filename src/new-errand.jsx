import React from 'react';
import axios from 'axios';
import {Button, Input} from 'reactstrap';
export class NewErrandPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { title:"", explanation: "", location:"", fee:null, currentUser:{} }
  }

  textChanged(ev) {
    this.setState({ [ev.target.id]: ev.target.value });
  }

  checkAuth(){
    axios.get("/isAuthenticated").then((res)=>{
        if(res.status==200){
            let currentUser = res.data;
            this.setState({currentUser});
        }
    })
    .catch(err=> {
        alert(err + "\nYou are not authrized. Please login!");
        this.props.history.push("/");
    });
  }

  componentDidMount(){
    this.checkAuth();
  }

  createErrand() {
    if(!this.state.title){
      window.alert("You can't empty title!");
      return;
    }
    if(!this.state.explanation){
      window.alert("You can't empty explanation!");
      return;
    }

    var d = new Date();
    let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
     axios.post('/api/errands', {
      id: null,
      title:this.state.title,
      explanation: this.state.explanation,
      poster: this.state.currentUser.email,
      runner: null,
      state:0,
      requestedDayAndTime:now,
      acceptedDayAndTime:null,
      location:this.state.location,
      fee:this.state.fee
    })
      .then((res) => {
        this.props.history.push("/errands-list");
      })
      .catch((err)=> {
        console.log(err);
      });
  }

  render() {
    return <div>
      <h4>New Errand</h4>
      <Input style={{marginBottom:"2%"}} type="text" id="title" placeholder="Title" onChange={ev => this.textChanged(ev)} />
      <Input style={{marginBottom:"2%"}} type="text" id="location" placeholder="Location" onChange={ev=> this.textChanged(ev)} />
      <Input style={{marginBottom:"2%"}} type="number" id="fee" placeholder="Offering to pay" onChange={ev=> this.textChanged(ev)}/>
      <Input style={{marginBottom:"2%"}} type="textarea" id="explanation" placeholder="Explanation" onChange={ev => this.textChanged(ev)} />
      <Button style={{width:"50%"}} outline color ="primary" onClick={() => {
        this.createErrand();
      }}>Post</Button>
      <Button style={{width:"50%"}}  outline color ="primary"  onClick={() => this.props.history.push("/errands-list")}>Cancel</Button>
    </div>
  }
}