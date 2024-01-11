'use client'

import { useState } from "react";
import {
    Input,
    Button,
    Slider,
    Rating
  } from "@material-tailwind/react";

const AddRecipe = () => {

    const [recipeName, setRecipeName] = useState('')
    const [hungerRating, setHungerRating] = useState('50')
    const [budgetRating, setBudgetRating] = useState('50')
    const [healthRating, setHealthRating] = useState('1')

    const  addRecipeHandler = async () => {

        console.log(
            recipeName,
            hungerRating,
            budgetRating,
            healthRating
        )

        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify({
                recipeName,
                hungerRating,
                budgetRating,
                healthRating
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok) {
            console.log('error')
        }
    }

    return (
        <div className="mt-10">
            <h1>Add Recipe</h1>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                <label>Recipe Name</label>
                <Input type="text" required value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <label>Hunger Rating</label>
                <Slider required value={hungerRating} onChange={(e) => setHungerRating(e.target.value)} />
                <label>Budget Rating</label>
                <Slider required value={budgetRating} onChange={(e) => setBudgetRating(e.target.value)} />
                <label>Health Rating</label>
                <Rating required value={healthRating} onChange={(e) => setHealthRating(e)} />
                <Button onClick={addRecipeHandler}>Add Recipe</Button>
                </div>
            </form>
        </div>
    );
}

export default AddRecipe;