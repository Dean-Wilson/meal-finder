import meals from '../db'
import { NextResponse } from 'next/server'
import fs from 'fs'

// async function to get all meals
export async function GET() {
  const allRecipes = await meals.sort()
  return NextResponse.json({
    meals: allRecipes,
    ok: true,
  })
}

export async function POST(req, res) {
  const { recipeName, hungerRating, budgetRating, healthRating } =
    await req.json()

  if (!recipeName || !hungerRating || !budgetRating || !healthRating) {
    return NextResponse.json({
      ok: false,
      error: 'Missing fields',
    })
  }

  const newRecipe = {
    id: meals.length + 1,
    name: recipeName,
    hungerRating,
    budgetRating,
    healthRating,
  }

  meals.push(newRecipe)
  const updatedRecipes = meals
  const updatedData = JSON.stringify(updatedRecipes, null, 2)

  try {
    fs.writeFileSync(
      './app/api/db.js',
      `export const meals = ${updatedData}; export default meals;`,
      'utf-8'
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      error: error,
    })
  }

  return NextResponse.json({
    meal: newRecipe,
    ok: true,
  })
}
