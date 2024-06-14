import React from 'react'

const DashboardCard = ({lablel , num}) => {
  return (
    <div className='bg-primery w-40 h-40 bg-secondary dark:bg-primary  rounded-xl flex flex-col justify-center items-center '>
      <h1 className='text-7xl mb-4'>
        {num}
      </h1>
      <h1>
        {lablel}
      </h1>
    </div>
  )
}

export default DashboardCard
