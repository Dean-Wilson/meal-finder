import meals from '@/api/db'
import { NextResponse } from 'next/server'
import fs from 'fs'

// async function to get all meals
export async function GET() {
  console.log('get all meals')
  const allMeals = await meals.sort()
  return NextResponse.json({
    meals: allMeals,
    ok: true,
  })
}

export async function POST(req, res) {
  const { mealName, hungerRating, budgetRating, healthRating } =
    await req.json()

  if (!mealName || !hungerRating || !budgetRating || !healthRating) {
    return NextResponse.json({
      ok: false,
      error: 'Missing fields',
    })
  }

  const newmeal = {
    id: meals.length + 1,
    name: mealName,
    hungerRating,
    budgetRating,
    healthRating,
  }

  meals.push(newmeal)
  const updatedMeals = meals
  const updatedData = JSON.stringify(updatedMeals, null, 2)

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
    meal: newmeal,
    ok: true,
  })
}
