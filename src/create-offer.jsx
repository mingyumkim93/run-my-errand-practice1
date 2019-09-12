import React from 'react';
import axios from 'axios';
import {Input, Button} from 'reactstrap';

export class CreateOfferPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            errand:{},
            message:"",
            fee:0,
            currentUser:{}
        }
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

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
        this.checkAuth();
    }

    textChanged(ev){
        this.setState({ [ev.target.id]: ev.target.value });
    }

    sendOffer(){
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        let offer = {
            id:null,
            sender:this.state.currentUser.email,
            receiver:this.state.errand.poster,
            message:this.state.message,
            date:now,
            errand_id:this.state.errand.id,
            fee:this.state.fee,
            state:0
        }
        axios.post('/api/offer',offer)
        .then(res=>{
            alert("You Created an offer!");
            this.props.history.goBack();
        })
        .catch(err=>console.log(err))

    }

    render(){
        if(this.state.errand.poster == this.state.currentUser.email)
        //TODO : change this line below
        return <div><h1>You can't offer to your errand</h1></div>
        return <div>
            <h4>Create Offer</h4>
            <Input style={{marginBottom:"2%"}} type="textarea" id="message" placeholder="Message" onChange={(ev)=>this.textChanged(ev)}/>
            <Input style={{marginBottom:"2%"}} type="number" id="fee" placeholder="My fee" onChange={(ev)=>this.textChanged(ev)}/>
            <Button style={{width:"50%"}} outline color="primary" onClick={()=>this.sendOffer()}>Send</Button>
            <Button style={{width:"50%"}} outline color="primary" onClick={()=>this.props.history.goBack()}>Back</Button>
        </div>
    }
}