import React, { useState, useEffect } from 'react';
import axios from 'axios'

function MyComponent() {
  // const [data, setData] = useState(null);
  // const [err, setError] = useState(null)
  // console.log("hi")
  // useEffect(() => {
  //   fetch('http://localhost:4000', {
  //     method: 'get'
  //   })
  //   .then(response => console.log(response))
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  // }, []);
  console.log("hi")
  // const [users, setUsers] = useState([])
  useEffect(()=>
  {
    axios.get('/api/calendar/events')
    .then(res => {
      console.log(res)
    })
  })

  return (
    <div>
      <h1>Hi!</h1>
    </div>
  );
}

export default MyComponent;
