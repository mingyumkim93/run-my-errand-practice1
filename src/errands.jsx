import React from 'react';
import {Link} from 'react-router-dom';

export const Errands = function({errand, currentUserEmail, role}) {
    if (role == 10)
    return <tr>
        <td><Link to={`user/${errand.poster}`}>{errand.poster}</Link></td>
            <td>{errand.title}</td>
            <td>{errand.location}</td>
            {errand.state == 0 && <td>Waiting for acceptance</td>}
            {errand.state == 10 && <td>In progress</td>}
            {errand.state == 20 && <td>In progress</td>}
            {errand.state == 30 && <td>In progress</td>}
            {errand.state == 40 && <td>Done</td>}
            <td>{errand.requestedDayAndTime}</td>
            <td>{errand.fee}€</td>
            <td><Link to={`my-errand/${errand.id}`}>Modify</Link></td>
            <td><Link to={`errand/${errand.id}`}>Details</Link></td>
    </tr>
    if (errand.state !== 40) // Show only not terminated requests
        return <tr>
            <td><Link to={`user/${errand.poster}`}>{errand.poster}</Link></td>
            <td>{errand.title}</td>
            <td>{errand.location}</td>
            {errand.state == 0 && <td>Waiting for acceptance</td>}
            {errand.state !== 0 && <td>In progress</td>}
            <td>{errand.requestedDayAndTime}</td>
            <td>{errand.fee}€</td>
            {currentUserEmail == errand.poster &&
                <td><Link to={`my-errand/${errand.id}`}>Modify</Link></td>}
            {currentUserEmail !== errand.poster &&
                <td><Link to={`errand/${errand.id}`}>Details</Link></td>}
        </tr>
    else  // Don't show terminated request 
        return <tr></tr>
}