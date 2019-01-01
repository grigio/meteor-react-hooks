import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'
import {onAuthChange, routes} from "../../routes";


// Tracker.autorun(function(){
//     // debugger
//     const authenticated = false //!! Meteor.userId();
//     onAuthChange(authenticated);
// });

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});