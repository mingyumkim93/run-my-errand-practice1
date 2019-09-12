import React from 'react';
import axios from 'axios';
import {ErrandsIPosted} from './errands-i-posted';
import {ErrandsIRun} from './errands-i-run';
import {Button, Table, Label} from 'reactstrap';
export class MyErrandsListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errands: [],
            currentUser:{},
            updateMyErrandsList:false
        }
        this.updateMyErrandsList = this.updateMyErrandsList.bind(this)
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

    updateMyErrandsList(val){
        this.setState({updateMyErrandsList:val});
    }

    componentDidMount() {
        axios.get("/api/errands").then(res => {
            const errands = res.data;
            this.setState({ errands });
        });
        this.checkAuth();
    }

    render() {
        let errandsIPosted = [];
        let errandsIRun = [];
        let { currentUser } = this.state;
        this.state.errands.forEach(errand => {
            if (errand.poster == currentUser.email)
                errandsIPosted.push(errand);
        });
        this.state.errands.forEach(errand => {
            if (errand.runner == currentUser.email)
                errandsIRun.push(errand);
        });
        let rowsErrandsIPosted = errandsIPosted.map(errand => <ErrandsIPosted
            errand={errand} key={errand.id} updateMyErrandsList={this.updateMyErrandsList}>
        </ErrandsIPosted>);
        let rowsErrandsIRun = errandsIRun.map(errand => <ErrandsIRun
            errand={errand} key={errand.id} updateMyErrandsList={this.updateMyErrandsList}>
        </ErrandsIRun>);
        return <div>
            <div>
            <h4>My Errands</h4>
                <Label>Errands you posted</Label>
                <Table responsive={true} className="table-hover">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>Pay</td>
                            <td>State</td>
                            <td>Runner</td>
                            <td>Posted</td>
                            <td>Accepted</td>
                            <td>Location</td>
                            <td>&nbsp;</td>
                        </tr>
                    </thead>
                    <tbody>{rowsErrandsIPosted}</tbody>
                </Table>
            </div>
            <br />
            <br />
            <div>
                <Label>Errands you are running / Errands you have run</Label>
                <Table responsive={true} className="table-hover">
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Explanation</td>
                            <td>Pay</td>
                            <td>State</td>
                            <td>Poster</td>
                            <td>Posted</td>
                            <td>Accepted</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody >{rowsErrandsIRun}</tbody>
                </Table>
            </div>
            <Button outline color ="primary" onClick={() => this.props.history.push("/errands-list")}>Back To List</Button>
        </div>
    }
}