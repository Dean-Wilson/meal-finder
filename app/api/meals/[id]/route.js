import meals from '@/api/db'

// get meal by id
export async function GET(req, res) {
  const { id } = req.query
  const meal = meals.filter((meal) => meal.id == id)

  //if no meal, 404
  if (meal.length === 0) {
    res.status(404).send('Meal not found')
    return
  }
  
  res.status(200).json({
    meal: meal[0],
    ok: true,
  })
}

// import meals from '@/api/db'

// // get meal by id
// export async function GET(req, res) {
//   // const { id } = req.query
//   const id = req.nextUrl.searchParams.get('id')
//   const meal = meals.filter((meal) => meal.id == id)

//   //if no meal, 404
//   if (meal.length === 0) {
//     res.status(404).send('Meal not found')
//     return
//   }
  
//   res.status(200).json({
//     meal: meal[0],
//     ok: true,
//   })
// }
