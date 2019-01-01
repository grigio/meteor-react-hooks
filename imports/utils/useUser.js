import React, { useState, useEffect } from 'react'

export function useUser() {
  const [currentUser, setCurrentUser] = useState(null)

  function loginWithPassword(username, password) {
    Meteor.loginWithPassword(username, password, (err, data) => {
      if (err) {
        // console.error('Login Error: ', err)
        throw err
      } else {
        setCurrentUser({ _id: Meteor.user().id, username: Meteor.user().username })
      }
    })
  }

  function logout() {
    Meteor.logout()
    setCurrentUser(null)
  }

  useEffect(() => {
    // setTimeout(() => {
    //   if (Meteor.user()) {
    //     setCurrentUser({ _id: Meteor.user().id, username: Meteor.user().username })
    //     // console.log(`restore ${Meteor.user().username} from Meteor env`)
    //   }
    // }, 1000);

    return () => {
      // out
    }
  }, []);

  return [currentUser, loginWithPassword, logout]
}