'use client'

import { useState } from "react";
import {
    Input,
    Button,
    Slider,
    Rating
  } from "@material-tailwind/react";

const AddMeal = () => {

    const [recipeName, setRecipeName] = useState('')
    const [hungerRating, setHungerRating] = useState('50')
    const [budgetRating, setBudgetRating] = useState('50')
    const [healthRating, setHealthRating] = useState('1')
    const [message, setMessage] = useState('')

    const  addRecipeHandler = async () => {

        const response = await fetch('/api/meals', {
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

        // if response is ok, then clear form and show message
        if(response.ok) {
            setRecipeName('')
            setHungerRating('50')
            setBudgetRating('50')
            setHealthRating('1')
            setMessage('meal added!')
        }

    }

    return (
        <div className="">
            <form className="mt-8 mb-2 max-w-screen-md">
                <div className="mb-1 flex flex-col gap-6">
                <label>meal Name</label>
                <Input type="text" required value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <label>Hunger Rating</label>
                <Slider required value={hungerRating} onChange={(e) => setHungerRating(e.target.value)} />
                <label>Budget Rating</label>
                <Slider required value={budgetRating} onChange={(e) => setBudgetRating(e.target.value)} />
                <label>Health Rating</label>
                <Rating required value={healthRating} onChange={(e) => setHealthRating(e)} />
                <Button onClick={addRecipeHandler}>Add meal</Button>
                <p>{message}</p>
                </div>
            </form>
        </div>
    );
}

export default AddMeal;