import React from 'react'
import style from './recipe.module.css';
import deleteIcon from '../Components/Pictures/deleteIcon.png'

var key = 0;
const MyRecepie = (props) => {


    return (
        <div className={style.recipe}>
           <h6 style={{margin: 0, color: "forestgreen", fontStyle:"italic", textAlign: "center"}}> {props.name === "Example Pancakes" ? "Click the menu button to add a new recipe" : null}  </h6>
            <h4 className={style.recipeHeader}>{props.name}</h4>
            <div className={style.position}>
                {props.name === "Example Pancakes" ? null :
                    <img onClick={props.mod} src={deleteIcon} alt="" />}

            </div>
            <p className={style.bold}>ingredients:</p>
            <ol>
                {props.ingredients.map(ingredient => (
                    <li key={key++}>{ingredient}</li>
                ))}
            </ol>
            <img className={style.image} src={props.img} alt="" />

            <button className={style.button1} onClick={props.showInstructions}>Show full instructions</button>

        </div>
    )
}

export default MyRecepie