'use client'

import React from 'react'
import {
  Typography
} from "@material-tailwind/react";

const meal = ( {params} ) => {
  return (
    <Typography variant="h1">meal {params.id}</Typography>
  )
}

export default meal