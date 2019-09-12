import React from 'react';
import axios from 'axios';
import { Errands } from './errands';
import { Table, Button, Input, Container, Row, Col } from 'reactstrap';

export class ErrandsListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errands: [], filter: "", currentUser: {}
        }
    }

    getErrandsFromDB() {
        axios.get('/api/errands').then(res => {
            const errands = res.data;
            this.setState({ errands });
        });
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

    componentDidMount() {
        this.checkAuth();
        this.getErrandsFromDB();
    }

    filterChanged(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    logout() {
        axios.get("/logout").then((res)=>this.props.history.push("/")).catch(err => console.log(err));
    }

    render() {
        let { errands, filter, currentUser } = this.state;
        let filtered = errands.filter(errand => errand.title.toLowerCase().includes(filter.toLowerCase()));
        let rows = filtered.map(errand => <Errands errand={errand} key={errand.id} currentUserEmail={currentUser.email} role={currentUser.role} />)

        return <div>
            <h4>Errand List</h4>
            <Container fluid>
            
            <Row>
                <Col sm="6" style={{ padding:0}}>
                    <Input style = {{height:"100%" }} type="text" id="filter" placeholder="Add keyword to filter errands based on title" onChange={e => this.filterChanged(e)} />
                </Col>
                <Col sm="2" style={{ padding:0}}>
                    <Button style={{ width: "100%" }} outline color="primary" onClick={() => this.props.history.push("/my-errands-list")}> My Errands </Button>
                </Col>
                <Col sm="2" style={{ padding:0}}>
                    <Button style={{ width: "100%"}} outline color="primary" onClick={() => this.props.history.push(`/my-account`)}> My Account</Button>
                </Col>
                <Col sm="2" style={{ padding:0}}>
                <Button style={{ width: "100%", height:"100%" }} outline color="primary" onClick={() => {
                        this.logout();
                    }}>Logout</Button>
                 </Col>
            </Row>
            <Row>
                <Col >
                    <Table className="table-hover" responsive={true}>
                        <thead>
                            <tr>
                                <td>Poster</td>
                                <td>Title</td>
                                <td>Location</td>
                                <td>State</td>
                                <td>Date</td>
                                <td>Pay</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
            <Button style={{ width: "100%", marginBottom:"2%" }} outline color="primary" onClick={() => this.props.history.push("/create-errand")}> New Errand </Button>
            </Row>

        </Container>
        </div>
        

    }
}