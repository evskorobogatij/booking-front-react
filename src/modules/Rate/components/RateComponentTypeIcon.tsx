import React from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import HouseIcon from '@mui/icons-material/House'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import Tooltip from '@mui/material/Tooltip'
import { RateComponentModel } from '../types'

interface Props {
  type: RateComponentModel['type']
}

const RateComponentTypeIcon: React.FC<Props> = ({ type }) => {
  if (type === 'FOOD_RATE') {
    return (
      <Tooltip title="FOOD_RATE">
        <RestaurantIcon color="primary" />
      </Tooltip>
    )
  }

  if (type === 'PLACE_RATE') {
    return (
      <Tooltip title="PLACE_RATE">
        <HouseIcon color="warning" />
      </Tooltip>
    )
  }

  return (
    <Tooltip title="TREATMENT_RATE">
      <HealthAndSafetyIcon color="success" />
    </Tooltip>
  )
}

export default RateComponentTypeIcon
