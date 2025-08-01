import React from 'react'
import SpecialStats from '../components/Dashboard/SpecialStats'
import IncomingTodos from '../components/Dashboard/IncomingTodos'

const Dashboard = () => {

  return (
    <>
      <center>

        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Todo Count</th>
            </tr>
          </thead>
          <SpecialStats />
        </table>

      </center>

      <IncomingTodos/>
      <div>
        Dashboard page
      </div>
    </>
  )
}

export default Dashboard