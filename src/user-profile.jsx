import React from 'react';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export class UserProfilePage extends React.Component{

    constructor(props){
        super(props); 
        this.state={
            user:{},
            reviews:[]
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
        let userEmail = this.props.match.params.email;
        axios.get(`/api/user/${userEmail}`).then(res => {
            const user = res.data;
            this.setState({ user });
        });
        axios.get(`/api/review/${userEmail}`).then(res=>{
            const reviews = res.data;
            this.setState({reviews})
        });
    }

    render(){
        let {user, reviews} = this.state;
        let showReviews = reviews.map(review => <ListGroupItem key={review.id} style={{padding:0}}>
            <ListGroupItemHeading>{review.sender}</ListGroupItemHeading>
            <ListGroupItemText>{review.stars}Stars : {review.comment}</ListGroupItemText>
        </ListGroupItem>)

        return <ListGroup>
            <h4>User Info</h4>
            <ListGroupItem style={{padding:0}}>
                <ListGroupItemHeading>Name</ListGroupItemHeading>
                <ListGroupItemText>{user.firstName} {user.lastName}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem style={{padding:0}}>
                <ListGroupItemHeading>Email</ListGroupItemHeading>
                <ListGroupItemText>{user.email}</ListGroupItemText>
            </ListGroupItem>
            <ListGroupItem style={{padding:0}}>
                <ListGroupItemHeading>Phone</ListGroupItemHeading>
                <ListGroupItemText>{user.phone}</ListGroupItemText>
            </ListGroupItem>
            <h3>Reviews</h3>
            {showReviews}
            <Button style={{marginTop:"2%"}} outline color = "primary" onClick={()=>this.props.history.goBack()}>Back</Button>
        </ListGroup>
    }
}