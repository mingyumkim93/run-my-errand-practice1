import React from 'react';
import axios from 'axios';
import { Button, Input, Container, Row, Col, Media } from 'reactstrap';

export class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: null,
            role: 0
        }
    }

    textChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    signUp() {
        let { id, firstName, lastName, email, password, phone, role } = this.state;
        if (!(email && password && firstName && lastName && phone)) {
            window.alert("Please fill every fields!");
            return;
        }
        axios.post("/api/user", { id, firstName, lastName, email, password, phone, role })
            .then((res) => {
                if (res.status == 200) {
                    window.alert("You signed up successfully. Move to login page.");
                    this.props.history.push("/");
                }
            })
            .catch(err => {
                if (err.response.status == 404) {
                    window.alert(`Email ${email} is already exist, please select other email`);
                    return;
                }
            });
    }

    sendLoginedUserToErrandsListPage(){
        axios.get("/isUnauthenticated").then((res)=>{
            if(res.status==200){
                console.log("Welcome!")
            }
            //is it correct to send 404..?
            if(res.status==404){
                this.props.history.push("/errands-list");
            }
        })
        .catch((err)=>{
            this.props.history.push("/errands-list");
        })
    }

    componentDidMount(){
        this.sendLoginedUserToErrandsListPage();
    }

    render() {
        return <Container style={{height:"100%", margin:"0%"}} fluid>
            <Row className = "align-items-center" style={{height:"100%"}}>
                <Col className="d-none d-sm-block" sm="6">
                    <Media style={{ maxWidth: "100%", position:"absolute",top:"50%",left:"50%",
                                transform:"translateX(-50%) translateY(-50%)"}} src="signup.jpg" alt="Generic placeholder image" />
                </Col>
                <Col sm="6">
                    <h4>Sign Up</h4>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Input style={{ width:"100%"}}onChange={(e) => this.textChange(e)} type="text" id="email" placeholder="Email" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Input onChange={(e) => this.textChange(e)} type="text" id="password" placeholder="Password" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Input onChange={(e) => this.textChange(e)} type="text" id="firstName" placeholder="FirstName" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Input onChange={(e) => this.textChange(e)} type="text" id="lastName" placeholder="LastName" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Input onChange={(e) => this.textChange(e)} type="text" id="phone" placeholder="Phone" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5%", width:"100%"}}>
                        <Col>
                            <Button style={{width : "50%"}} outline color="primary" onClick={() => this.signUp()}>Sign Up</Button>
                            <Button style={{width : "50%"}} outline color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
                        </Col>
                    </Row>
                        </Col>
                    </Row>
        </Container>


    }
}
