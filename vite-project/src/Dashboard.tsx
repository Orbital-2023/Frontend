import React from 'react'
import HeatMap from './scenes/calendar'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    // Heatmap will be on the left but will shift to the top when mid-screen size
    <HeatMap></HeatMap>
  )
}

export default Dashboard
