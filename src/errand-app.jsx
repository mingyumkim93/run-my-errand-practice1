import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { SignUpPage} from './sign-up';
import { LoginPage } from './login';
import { ErrandsListPage } from './errands-list';
import { NewErrandPage } from './new-errand';
import { MyErrandsListPage } from './my-errands';
import { ErrandDetailPage } from './errand-detail';
import { ModifyMyErrandPage } from './modify-my-errand';
import { UserProfilePage } from './user-profile';
import { CreateOfferPage} from'./create-offer';
import { SeeOfferPage} from './see-offer';
import { MyAccountPage} from './my-account';

export class ErrandApp extends React.Component {

    render() {

        return <div>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path ="/signup" component={SignUpPage}/>
                <Route exact path="/errands-list" component={ErrandsListPage} />
                <Route exact path="/create-errand" component={NewErrandPage}/>
                <Route exact path="/my-errands-list" component={MyErrandsListPage}/>
                <Route exact path="/errand/:id" component={ErrandDetailPage}/>
                <Route exact path="/my-errand/:id" component={ModifyMyErrandPage}/>
                <Route exact path="/user/:email" component={UserProfilePage}/>
                <Route exact path="/create-offer/:id" component={CreateOfferPage}/>
                <Route exact path="/see-offers/:id" component={SeeOfferPage}/>
                <Route exact path="/my-account" component={MyAccountPage}/>
            </Switch>
        </div>

    }
} 