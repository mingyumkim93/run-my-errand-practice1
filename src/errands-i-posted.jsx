import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';


export class ErrandsIPosted extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            offers:[]
        }

    }

    changeErrandToNotAccepted (errand)  {
        errand.state = 0;
        errand.runner = "";
        errand.acceptedDayAndTime = "";
        axios.put(`/api/errands/${errand.id}`, errand)
            .then((res) => console.log("Errand has been changed"))
            .catch(err => console.log(err));
    }
    
    posterApproves (errand)  {
        errand.state = 20;
        axios.put(`/api/errands/${errand.id}`, errand).then((res) => {
            console.log("You approved.");
        })
            .catch(err => window.alert(err));
    }
    
    leaveReviewToRunner  (errand)  {
        let stars = prompt("Please give your stars to runner 0 to 10 : ");
        if (stars > 10) stars = 10; if (stars < 0) stars = 0;
        if (stars) {
            let comment = prompt("Please leave comments to runner");
            var d = new Date();
            let now = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
            var review = {
                id: null,
                sender: errand.poster,
                receiver: errand.runner,
                comment: comment,
                date: now,
                stars: stars,
                errand_id: errand.id
            }
            axios.post("/api/review", review).then(res => {
                console.log("You left review.");
            })
                .catch(err => window.alert(err));
        }
        if (!stars) return;
    }
    
    finalizeErrand (errand)  {
        errand.state = 40;
        axios.put(`/api/errands/${errand.id}`, errand)
            .then(res => console.log("You Finalized Errand!"))
            .catch(err => console.log(err));
    }

    getOffersToThisErrand(errand){
        axios.get(`/api/offer/${errand.id}`)
        .then((res)=>{
            this.setState({offers : res.data})
        })
        .catch((err)=>console.log(err));
    }

    componentDidMount(){
        this.getOffersToThisErrand(this.props.errand)
    }

    render(){
        let errand = this.props.errand;
        let offers = this.state.offers;
        let stateZeroOffers = [];
        offers.map(offer => {if(offer.state==0)stateZeroOffers.push(offer)});
        return<tr>
        <td>{errand.title}</td>
        <td>{errand.explanation}</td>
        <td>{errand.fee}€</td>
        {errand.state == 0 && <td><Link  to={`/see-offers/${errand.id}`}>See offers ({stateZeroOffers.length})</Link></td>}
        {errand.state == 10 && <td>In progress
        <Button outline color = "primary" onClick={() => {
                let doubleCheck = window.confirm("Do you really want to finalize this errand?")
                if (doubleCheck) {
                    this.posterApproves(errand);
                    this.leaveReviewToRunner(errand);
                    this.props.updateMyErrandsList(true);
                }
            }}>Approve</Button>
            <Button outline color = "primary"  onClick={() => {
                let doubleCheck = window.confirm("Do you really want to cancel this errand?")
                if (doubleCheck) { 
                    this.changeErrandToNotAccepted(errand); 
                    this.props.updateMyErrandsList(true);
                }
            }}>Terminate</Button></td>}
        {errand.state == 20 && <td>You approved. Waiting for runner to confirm...</td>}
        {errand.state == 30 && <td>Runner confirmed. Please approve.
        <Button outline color = "primary"  onClick={() => {
                let doubleCheck = window.confirm("Do you really want to finalize this errand?")
                if (doubleCheck) {
                    this.finalizeErrand(errand);
                    this.leaveReviewToRunner(errand);
                    this.props.updateMyErrandsList(true);
                }
            }}>Approve</Button></td>}
        {errand.state == 40 && <td>Done</td>}
        <td>{errand.runner == "" && "-"}<Link to={`user/${errand.runner}`}>{errand.runner}</Link></td>
        <td>{errand.requestedDayAndTime}</td>
        <td>{errand.acceptedDayAndTime == "" && "-"}{errand.acceptedDayAndTime}</td>
        <td>{errand.location}</td>
        <td><Link to={`my-errand/${errand.id}`}>Modify</Link></td>
    </tr>
    
    }
}