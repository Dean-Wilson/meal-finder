'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { Typography } from '@material-tailwind/react'

const meal = ({ params }) => {
  const [meal, setMeal] = useState([])

  useEffect(() => {
    const id = params.id
    const fetchMeal = async () => {
      const res = await fetch(`/api/meals/${id}`, {
      // const res = await fetch('/api/meals/id?id='+ id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { meal } = await res.json()
      setMeal(meal)
    }
    fetchMeal()
  }, [])

  return <Typography variant="h1">Order {meal.name}</Typography>
}

export default meal
