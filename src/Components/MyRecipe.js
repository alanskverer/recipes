import React from 'react'
import style from './recipe.module.css';
import deleteIcon from '../Components/Pictures/deleteIcon.png'

var key = 0;
const MyRecepie = (props) => {


    return (
        <div className={style.recipe}>
            <h4>{props.name}</h4>
            <div className={style.position}><img onClick={props.mod} src={deleteIcon} alt="" /></div>
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