'use client'
import { useState, useEffect } from 'react'
import { Slider, Rating, List, ListItem, Button, Typography } from '@material-tailwind/react'

// export function DefaultRating(params) {
//   const { label } = params
//   return (
//     <div className="flex flex-row items-center mt-4">
//       <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">{label}</h3>
//       <Rating value={4} />
//     </div>
//   )
// }

// export function DefaultSlider(params) {
//   const { label, value } = params
//   return (
//     <div className="flex flex-row items-center mt-4">
//       <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">{label}</h3>
//       <Slider className="flex-col" value={value} />
//     </div>
//   )
// }

export function Filters(params) {
  const {
    hunger,
    budget,
    health,
    onHungerChange,
    onBudgetChange,
    onHealthChange,
  } = params
  return (
    <div className="filters mb-10">
      <div className="flex flex-row items-center mt-4">
        <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">Hunger</h3>
        <Slider
          className="flex-col"
          label="Budget"
          value={hunger}
          onChange={(e) => onHungerChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center mt-4">
        <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">Budget</h3>
        <Slider
          className="flex-col"
          label="Budget"
          value={budget}
          onChange={(e) => onBudgetChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center mt-4">
        <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">Health</h3>
        <Rating
          label="Health rating"
          value={health}
          readOnly
          onChange={(e) => onHealthChange(e)}
        />
      </div>
    </div>
  )
}

export function MealRow(params) {
  const { name, link } = params
  return (
    <>
      <a className="flex w-full justify-between items-center" href={link}>
        <h3 className="text-lg">{name}</h3>
        <span className="text-lg">View</span>
      </a>
    </>
  )
}

export function MealTable({ meals, hunger, budget, health }) {
  const rows = []

  meals.forEach((meal) => {
    const hungerScore = calculateSliderScore(meal.hungerRating, hunger)
    const budgetScore = calculateSliderScore(meal.budgetRating, budget)
    const healthScore = calculateRatingScore(meal.healthRating, health)
    meal.score = hungerScore + budgetScore + healthScore
  })

  // sort meals by score, lowest to highest AND limit to 3
  const filteredMeals = meals.sort((a, b) => a.score - b.score).slice(0, 3)

  filteredMeals.forEach((meal) => {
    // console.log(meal)
    rows.push(
      <ListItem key={meal.id} className="flex flex-row justify-between px-4 py-3 mt-2 text-white bg-blue-gray-700 hover:bg-blue-500 hover:text-white">
        <MealRow name={meal.name} link={`/meals/${meal.id}`} />
      </ListItem>
    )
  })
  return (
    <div className="meal-table mt-10">
      <h2>Top 3 meals</h2>
      <List className="px-0">{rows}</List>
    </div>
  )
}

export function MealFinderTable({ meals }) {
  const [filterHunger, setFilterHunger] = useState(50)
  const [filterBudget, setFilterBudget] = useState(50)
  const [filterHealth, setFilterHealthRating] = useState(3)
  // console.log('state Values', filterHunger, filterBudget, filterHealth)
  return (
    <>
      <Typography variant="h1">What to order?</Typography>
      <Filters
        hunger={filterHunger}
        budget={filterBudget}
        health={filterHealth}
        onHungerChange={setFilterHunger}
        onBudgetChange={setFilterBudget}
        onHealthChange={setFilterHealthRating}
      />
      <MealTable
        meals={meals}
        hunger={filterHunger}
        budget={filterBudget}
        health={filterHealth}
      />
    </>
  )
}

export default function MealFinder() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const fetchAllMeals = async () => {
      const res = await fetch('/api/meals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { meals } = await res.json()
      setMeals(meals)
    }
    fetchAllMeals()
  }, [])

  return <MealFinderTable meals={meals} />
}

function calculateSliderScore(mealValue, userValue) {
  return mealValue >= userValue
    ? mealValue - userValue
    : (mealValue - userValue) * -1
}

function calculateRatingScore(mealValue, userValue) {
  // never show a meal with a health rating difference of 3 or more
  const difference = Math.abs(mealValue - userValue);
  if (difference >= 3) {
    return 1000;
  }

  // get the difference between the two values return positive integer multiplied by 20 to match slider score scale
  return mealValue >= userValue
    ? (mealValue - userValue) * 20
    : (mealValue - userValue) * -20
}
