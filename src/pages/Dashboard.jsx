import React from 'react'
import SpecialStats from '../components/Dashboard/SpecialStats'
import IncomingTodos from '../components/Dashboard/IncomingTodos'
import Header from '../components/Header'

const Dashboard = () => {

  return (
    <>

    <div className='h-screen bg-gray-50'>

      <Header />

      <section class=" py-6">
          <div class="mx-auto overflow-x-auto rounded-lg shadow-md max-w-xl">
            <table class="min-w-full divide-y divide-gray-200">
              <thead >
                <tr>
                  <th scope="col" class=" px-6 py-3 text-center text-lg font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-center text-lg font-semibold text-gray-500 uppercase tracking-wider">Todo Count</th>
                </tr>
              </thead>
              <SpecialStats />
            </table>
          </div>
      </section>

      <section class=" py-6">
        <div class="mx-auto overflow-x-auto rounded-lg shadow-md max-w-xl">
          <IncomingTodos />
        </div>
      </section>
    </div>


    </>
    


  )
}

export default Dashboard