import meals from '@/api/db'
import { NextResponse } from 'next/server'

// // get meal by id
export async function GET(req, res) {
  console.log('get single meal')
  const id = req.nextUrl.searchParams.get('id')
  
  const meal = meals.filter((meal) => meal.id == id)

  // TODO: if no meal, 404
  if (meal.length === 0) {
    return NextResponse.json({
      meal: [],
      ok: false,
    })
  }
  
  return NextResponse.json({
    meal: meal[0],
    ok: true,
  })
}
