import React from 'react';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
export class ErrandDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errand: {},
            poster: {}
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

    getPosterInfoByErrandPoster(poster) {
        axios.get(`/api/user/${poster}`).then(res => {
            const poster = res.data;
            this.setState({ poster });
        }).catch(err => console.log(err));

    }

    getErrandFromDB(errandId) {
        axios.get(`/api/errands/${errandId}`).then(res => {
            const errand = res.data;
            this.setState({ errand });
            this.getPosterInfoByErrandPoster(errand.poster);
        });
    }

    componentDidMount() {
        let errandId = this.props.match.params.id;
        if (errandId) this.getErrandFromDB(errandId);
        this.checkAuth();
    }

    render() {
        let { errand, poster } = this.state;
        return <ListGroup>
            <h4>Errand Detail</h4>
                 <ListGroupItem style={{padding:0}}>
                     <ListGroupItemHeading>Name</ListGroupItemHeading>
                     <ListGroupItemText>
                      {poster.firstName} {poster.lastName}
                     </ListGroupItemText>
                 </ListGroupItem>
                <ListGroupItem style={{padding:0}}>
                      <ListGroupItemHeading>Email</ListGroupItemHeading>
                      <ListGroupItemText>
                         {poster.email}
                      </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem style={{padding:0}}> 
                       <ListGroupItemHeading>Phone</ListGroupItemHeading>
                        <ListGroupItemText>
                         {poster.phone}
                        </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem style={{padding:0}}>
                         <ListGroupItemHeading>Title</ListGroupItemHeading>
                         <ListGroupItemText>
                            {errand.title}
                        </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem style={{padding:0}}>
                         <ListGroupItemHeading>Explanation</ListGroupItemHeading>
                         <ListGroupItemText>
                            {errand.explanation}
                      </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem style={{padding:0, marginBottom:"2%"}}>
                        <ListGroupItemHeading>Offering to pay</ListGroupItemHeading>
                        <ListGroupItemText>
                          {errand.fee}€
                        </ListGroupItemText>
                </ListGroupItem>
            {errand.state == 0 &&
            <Button  outline color="primary" onClick={() => this.props.history.push(`/create-offer/${errand.id}`)}>
                    Create Offer
            </Button>}
            <Button  outline color="primary" onClick={() => this.props.history.push(`/user/${poster.email}`)}>
                Poster Profile
            </Button>
            <Button  outline color="primary" onClick={() => this.props.history.push("/errands-list")}>
                Back to list
            </Button>
        </ListGroup>
    }
}