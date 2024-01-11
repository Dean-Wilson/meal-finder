import recipes from '../db'
import { NextResponse } from 'next/server'
import fs from 'fs'

// async function to get all recipes
export async function GET() {
  const allRecipes = await recipes.sort()
  return NextResponse.json({
    recipes: allRecipes,
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
    id: recipes.length + 1,
    name: recipeName,
    hungerRating,
    budgetRating,
    healthRating,
  }

  recipes.push(newRecipe)
  const updatedRecipes = recipes
  const updatedData = JSON.stringify(updatedRecipes, null, 2)

  try {
    fs.writeFileSync(
      './app/api/db.js',
      `export const recipes = ${updatedData}; export default recipes;`,
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
    recipe: newRecipe,
    ok: true,
  })
}
