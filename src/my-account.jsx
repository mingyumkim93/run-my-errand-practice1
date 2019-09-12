import React from 'react';
import axios from 'axios';
import {Button, Input, Label} from 'reactstrap';

export class MyAccountPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            currentUser:{},
            newFirstName:"",
            newLastName:"",
            newPhone:"",
            newPassword:""
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

    componentDidMount(){
        this.checkAuth();
    }

    updateAccount(){
        let {newFirstName, newLastName, newPhone, newPassword} = this.state;
        if(!(newFirstName && newLastName && newPhone && newPassword)){
            alert("Please fill every fields!")
            return;
        } 
        let changedUser = this.state.user;
        changedUser.firstName = this.state.newFirstName;
        changedUser.lastName = this.state.newLastName;
        changedUser.phone = this.state.newPhone;
        changedUser.password = this.state.newPassword;
        axios.put(`/api/user/${localStorage.getItem("currentUser")}`,changedUser)
        .then(res=>{
            console.log(res);
            alert("Your account information has changed");
            this.props.history.push("/errands-list");
        })
        .catch(err => console.log(err));
    }

    textChanged(e){
        this.setState({[e.target.id]:e.target.value});
    }
    render(){
        let { currentUser } = this.state;
        return<div>
            <h4>My Account</h4>
            <Label>First Name</Label>
            <Input onChange={(e)=>this.textChanged(e)} placeholder = {currentUser.firstName} type="text" id="newFirstName" value={this.state.newFirstName}></Input>
            <Label>Last Name</Label>
            <Input onChange={(e)=>this.textChanged(e)} placeholder = {currentUser.lastName} type="text" id="newLastName" value={this.state.newLastName}></Input>
            <Label>Phone</Label>
            <Input onChange={(e)=>this.textChanged(e)} placeholder = {currentUser.phone} type="text" id="newPhone" value={this.state.newPhone}></Input>
            <Label>Password</Label>
            <Input style={{marginBottom:"2%"}} onChange={(e)=>this.textChanged(e)} type="password" id="newPassword" placeholder="New password"/>

            <Button style = {{width:"50%"}} outline color = "primary" onClick={()=>this.updateAccount()}>Change</Button>
            <Button style = {{width:"50%"}} outline color = "primary" onClick={()=>this.props.history.goBack()}>Back</Button>
        </div>
    }
}