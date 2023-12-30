'use client'
import { useState } from 'react'
import { Slider, Rating, List, ListItem } from '@material-tailwind/react'

export function DefaultRating(params) {
  const { label } = params
  return (
    <div className="flex flex-row items-center mt-4">
      <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">{label}</h3>
      <Rating value={4} />
    </div>
  )
}

export function DefaultSlider(params) {
  const { label, value } = params
  return (
    <div className="flex flex-row items-center mt-4">
      <h3 className="flex-col w-44 grow-0 shrink-0 mr-5">{label}</h3>
      <Slider className="flex-col" value={value} />
    </div>
  )
}

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
    <div className="filters">
      <div className="">
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
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10">
        Generate!
      </button>
    </div>
  )
}

export function RecipeRow(params) {
  const { name, link } = params
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-lg">{name}</h3>
      </div>
      <a href={link}>View</a>
    </>
  )
}

function calculateSliderScore(recipeValue, userValue) {
  return recipeValue >= userValue ? recipeValue - userValue : (recipeValue - userValue) * -1
}

function calculateRatingScore(recipeValue, userValue) {
  // get the difference between the two values return positive integer multiplied by 10
  return recipeValue >= userValue ? (recipeValue - userValue)*10 : (recipeValue - userValue) * -10
}

export function RecipeTable({ recipes, hunger, budget, health }) {
  const rows = []

  recipes.forEach((recipe) => {
    const hungerScore = calculateSliderScore(recipe.hungerRating, hunger)
    const budgetScore = calculateSliderScore(recipe.budgetRating, budget)
    const healthScore = calculateRatingScore(recipe.healthRating, health)
    recipe.score = hungerScore + budgetScore + healthScore
  })

  // sort recipes by score, lowest to highest AND limit to 3
  const filteredRecipes = recipes.sort((a, b) => a.score - b.score).slice(0, 3)

  filteredRecipes.forEach((recipe) => {
    // console.log(recipe)
    rows.push(
      <ListItem
        key={recipe.id}
        className="flex flex-row justify-between px-0"
      >
        <RecipeRow name={recipe.name} link={`/recipes/${recipe.id}`} />
      </ListItem>
    )
  })
  return (
    <div className="recipe-table mt-10">
      <h2>Top 3 Recipes</h2>
      <List className="px-0">{rows}</List>
    </div>
  )
}

export function RecipeFinderTable({ recipes }) {
  const [filterHunger, setFilterHunger] = useState(10)
  const [filterBudget, setFilterBudget] = useState(50)
  const [filterHealth, setFilterHealthRating] = useState(3)
  // console.log('state Values', filterHunger, filterBudget, filterHealth)
  return (
    <main className="flex min-h-screen flex-col justify-between p-24 w-1/2 m-auto">
      <h1 className="text-4xl font-bold">
        What to cook tonight?
      </h1>
      <Filters
        hunger={filterHunger}
        budget={filterBudget}
        health={filterHealth}
        onHungerChange={setFilterHunger}
        onBudgetChange={setFilterBudget}
        onHealthChange={setFilterHealthRating}
      />
      <RecipeTable
        recipes={recipes}
        hunger={filterHunger}
        budget={filterBudget}
        health={filterHealth}
      />
    </main>
  )
}

export default function RecipeFinder() {
  return <RecipeFinderTable recipes={RECIPES} />
}

const RECIPES = [
  {
    id: 1,
    name: 'Tacos',
    hungerRating: 60,
    budgetRating: 80,
    healthRating: 3
  },
  {
    id: 2,
    name: 'Pizza',
    hungerRating: 50,
    budgetRating: 30,
    healthRating: 1,
  },
  {
    id: 3,
    name: 'Roast Lamb',
    hungerRating: 80,
    budgetRating: 60,
    healthRating: 4,
  },
  {
    id: 4,
    name: 'Roast Chicken',
    hungerRating: 70,
    budgetRating: 90,
    healthRating: 4,
  },
  {
    id: 5,
    name: 'Couscous Salad',
    hungerRating: 50,
    budgetRating: 60,
    healthRating: 4,
  },
  {
    id: 6,
    name: 'Burgers',
    hungerRating: 70,
    budgetRating: 30,
    healthRating: 2,
  },
  {
    id: 7,
    name: 'Lasagne',
    hungerRating: 60,
    budgetRating: 30,
    healthRating: 2,
  },
]
