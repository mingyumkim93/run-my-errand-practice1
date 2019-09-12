import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

export class Offer extends React.Component {
    constructor(props) {
        super(props);
    }

    acceptOffer(inProcessErrand, offer){
        var d = new Date();
        let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        inProcessErrand.runner = offer.sender;
        inProcessErrand.acceptedDayAndTime = now;
        inProcessErrand.state = 10;
        inProcessErrand.fee = offer.fee;
        axios.put(`/api/errands/${inProcessErrand.id}`, inProcessErrand)
            .then((res) => this.props.moveToMyErrands())
            .catch((err) => console.log(err))
        let acceptedOffer = offer;
        acceptedOffer.state=10;
        axios.put(`/api/offer/${offer.id}`, acceptedOffer)
            .then((res) => console.log("offer state updated"))
            .catch(err => console.log(err))
    }

    render() {
        let offer = this.props.offer;
        let errand = this.props.errand;
        return <tr>
            <td><NavLink to={`/user/${offer.sender}`}>{offer.sender}</NavLink></td>
            <td>{offer.message}</td>
            <td>{offer.fee}€</td>
            <td>{offer.date}</td>
            <td><Button outline color="primary" onClick={() => {
                let doubleCheck = window.confirm("Do you really want to accept this offer?");
                if (doubleCheck) {
                    this.acceptOffer(errand, offer)
                }
            }}>Accept</Button></td>
        </tr>
    }

}