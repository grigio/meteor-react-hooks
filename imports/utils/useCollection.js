import React, { useState, useEffect } from 'react'

export function useCollection(name, collection) {
  const [tasks, setTasks] = useState([])

  async function insertItem(item) {
    const newId = await new Promise((resolve, reject) => {
      Meteor.call(`${name}.insert`, item, (err, data) => {
        if (err) { reject(err) }
        resolve(data)
      })
    })
    console.log('newId ', newId)
  }

  useEffect(() => {
    console.log('sub on')

    const cursor = collection.find()
    cursor.observe({
      added: function (doc) {
        setTasks(cursor.fetch())
      },
      changed: function (newDoc, oldDoc) {
        setTasks(cursor.fetch())
      },
      removed: function (doc) {
        setTasks(cursor.fetch())
      }
    });
    const tasksSub = Meteor.subscribe('tasks')

    return () => {
      console.log('sub off')
      console.log(tasksSub.stop())
    };
  }, []);

  return [tasks, insertItem]
}