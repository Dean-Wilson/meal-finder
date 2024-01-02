import recipes from '../db'
import { NextResponse } from 'next/server'

// async function to get all recipes
export async function GET(req, res) {    
    const allRecipes = await recipes.sort()
    return NextResponse.json({
        recipes: allRecipes,
        ok: true
    })
}
