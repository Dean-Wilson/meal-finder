'use client'

import React from 'react'
import {
  Typography
} from "@material-tailwind/react";

const Recipe = ( {params} ) => {
  return (
    <Typography variant="h1">Recipe {params.id}</Typography>
  )
}

export default Recipe