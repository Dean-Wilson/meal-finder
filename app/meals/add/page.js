'use client';

import React from 'react'
import AddMealForm from '@/components/add-meal-form'
import {
  Typography
} from "@material-tailwind/react";

const AddMeal = () => {
  return (
    <>
      <Typography variant="h1">Add Meal</Typography>
      <AddMealForm />
    </>
  )
}

export default AddMeal