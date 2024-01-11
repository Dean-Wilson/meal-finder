'use client';

import React from 'react'
import AddRecipe from '../../components/add-recipe'
import {
  Typography
} from "@material-tailwind/react";

const addRecipe = () => {
  return (
    <>
      <Typography variant="h1">Add Recipe</Typography>
      <AddRecipe />
    </>
  )
}

export default addRecipe