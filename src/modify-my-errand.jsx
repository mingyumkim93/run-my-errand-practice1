import React from 'react';
import axios from 'axios';
import {Button, Input, Label} from 'reactstrap';

export class ModifyMyErrandPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {},
            newTitle: "",
            newExplanation: "",
            newLocation: "",
            newFee: 0,
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
            if (errand.state !== 0) {
                alert("You can't modify errand in process");
                this.props.history.push("/errands-list")
            }
            else {
                this.setState({ errand });
                this.setState({ newTitle: errand.title })
                this.setState({ newExplanation: errand.explanation })
                this.setState({ newLocation: errand.location })
                this.setState({ newFee: errand.fee })
            }
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
        this.checkAuth()
    }
   
    textChanged(ev) {
        this.setState({ [ev.target.id]: ev.target.value });
    }

    modifyErrand() {
        if (!this.state.newTitle) {
            window.alert("You can't empty title!");
            return;
        }
        if (!this.state.newExplanation) {
            window.alert("You can't empty explanation!");
            return;
        }
        if (!this.state.newLocation) {
            window.alert("You can't empty location!");
            return;
        }
        if (!this.state.newFee) {
            window.alert("You can't empty fee!");
            return;
        }
        let errandId = this.props.match.params.id;
        let newErrand = this.state.errand;
        newErrand.title = this.state.newTitle;
        newErrand.explanation = this.state.newExplanation;
        newErrand.location = this.state.newLocation;
        newErrand.fee = this.state.newFee;
        axios.put(`/api/errands/${errandId}`, newErrand).then(() => this.props.history.push("/my-errands-list"));
    }

    deleteErrand() {
            let errandId = this.props.match.params.id;
            axios.delete(`/api/errands/${errandId}`).then(() => this.props.history.push("/my-errands-list"))
        
    }

    render() {
        let { newTitle, newExplanation, newLocation, errand, currentUser } = this.state;

        if ((errand.poster == currentUser.email) || currentUser.role == 10) {
            return <div>
                <h4>Modify My Errand</h4>
                <Label>Title</Label>
                <Input style={{marginBottom:"2%"}}  onChange={ev => this.textChanged(ev)} type="text" id="newTitle" value={newTitle} />
                <Label>Explanation</Label>
                <Input style={{marginBottom:"2%"}}  onChange={ev => this.textChanged(ev)} type="textarea" id="newExplanation" value={newExplanation} />
                <Label>Location</Label>
                <Input style={{marginBottom:"2%"}}  onChange={ev => this.textChanged(ev)} type="text" id="newLocation" value={newLocation} />
                <Label>Offering to pay</Label>
                <Input style={{marginBottom:"2%"}} onChange={ev => this.textChanged(ev)} type="number" id="newFee" placeholder={`${errand.fee}€`} />
                <Button style={{width:"33.3%"}} outline color = "primary" onClick={() => {
                     let doubleCheck = window.confirm("Do you really want to modify this errand?");
                     if (doubleCheck) {
                        this.modifyErrand();
                     }
                }}>Save Changes</Button>
                <Button style={{width:"33.3%"}}  outline color = "primary" onClick={() => {
                    let doubleCheck = window.confirm("Do you really want to delete this errand?");
                    if (doubleCheck) {
                    this.deleteErrand();
                    }
                }}>Delete</Button>
                <Button style={{width:"33.3%"}} outline color = "primary" onClick={() => this.props.history.goBack()}>Cancel</Button>
            </div>
        }
        else {
            return <div>
                <h1>You can't access this page</h1>
            </div>
        }
    }
}