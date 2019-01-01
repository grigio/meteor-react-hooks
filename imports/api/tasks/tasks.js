import { Meteor } from 'meteor/meteor'
// import TasksPage from '../../ui/TasksPage';

// export default Met
import { Mongo } from 'meteor/mongo'

export const Tasks = new Mongo.Collection("tasks")

Meteor.publish('tasks', function () {
  return Tasks.find()
})


Meteor.methods({
  'tasks.insert'({ description }) {
    return Tasks.insert({ description: description })
  },
  'tasks.deleteAll'() {
    // @note: only for authenticated and authorized users
    if (this.userId === 'mhopnTNwfkx5sDNxm') {
      return Tasks.rawCollection().drop()
    } else {
      console.log('unauthorized')
    }
  }
})