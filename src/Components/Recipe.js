import React from 'react'
import style from './recipe.module.css';

var key = 0;
const Recepie = (props) => {
  let recipeInstructions = (props.url != null) ? <a href={props.url} target="_blank">Full Recipe Instructions</a> : ""
  return (
    <div className={style.recipe}>
      <h1>{props.title}</h1>
      <p>Calories: {Math.floor(props.calories)}</p>
      <p className={style.bold}>ingredients:</p>
      <ol>
        {props.ingredients.map(ingredient => (
          <li key={key++}>{ingredient.text}</li>
        ))}
      </ol>
      <img className={style.image} src={props.img} />
      {recipeInstructions}

    </div>
  )
}

export default Recepie