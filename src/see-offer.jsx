import React from 'react';
import axios from 'axios';
import { Offer } from './offers';
import { Table, Button, ListGroup, ListGroupItem} from 'reactstrap';
export class SeeOfferPage extends React.Component {

    constructor(props) {
        super(props);
        this.moveToMyErrands = this.moveToMyErrands.bind(this);
        this.state = {
            offers: [],
            errand: {},
            moveToMyErrands: false,
            currentUser:{}
        }
    }

    moveToMyErrands() {
        this.props.history.push("/my-errands-list")
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

    getOffersToThisErrand(errandId) {
        axios.get(`/api/offer/${errandId}`)
            .then((res) => {
                this.setState({ offers: res.data })
            })
            .catch((err) => console.log(err));
    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`)
            .then((res) => {
                const errand = res.data
                this.setState({ errand })
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        this.getOffersToThisErrand(errandId)
        this.getErrandFromDB(errandId)
        this.checkAuth();
    }


    render() {
        let { offers, errand, currentUser } = this.state;
        let stateZeroOffers = [];
        offers.map(offer => { if (offer.state == 0) stateZeroOffers.push(offer) });
        let rows = stateZeroOffers.map(offer => <Offer offer={offer} errand={errand} moveToMyErrands={this.moveToMyErrands} key={offer.id} />)
        if (offers.length == 0) return <h1>There are no offers</h1>
        if (errand.poster == currentUser.email) {
            return <div>
                <h4>Offers to run your errand</h4>
                <ListGroup style={{marginBottom:"2%"}}>
                    <ListGroupItem style={{padding:0, border:0}}><b>Title : </b>{errand.title}</ListGroupItem>
                    <ListGroupItem style={{padding:0, border:0}}><b>Explanation : </b> {errand.explanation}</ListGroupItem>
                    <ListGroupItem style={{padding:0, border:0}}><b>Offering to pay : </b> {errand.fee}€</ListGroupItem>
                </ListGroup>
                <Table responsive={true}>
                <thead>
                    <tr>
                        <td>From</td>
                        <td>Message</td>
                        <td>Fee</td>
                        <td>When</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <thead>{rows}</thead>
            </Table>
            <Button  outline color="primary" onClick={() => this.props.history.goBack()}>Back</Button></div>
        }
        else {
            return <div>
                <h1>You can't access this page</h1>
                 <Button  outline color="primary" onClick={() =>  this.props.history.goBack()}>Back</Button>
            </div>
        }
    }
}