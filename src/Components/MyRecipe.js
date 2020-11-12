import React from 'react'
import style from './recipe.module.css';
import deleteIcon from '../Components/Pictures/deleteIcon.png'

var key = 0;
const MyRecepie = (props) => {
   const  alertit = () => {
        alert("yes")
    }

    return (
        <div className={style.recipe}>
            <div className={style.position}><img onClick={alertit} src={deleteIcon}  alt="" /></div>
            <p className={style.bold}>ingredients:</p>
            <ol>
                {props.ingredients.map(ingredient => (
                    <li key={key++}>{ingredient}</li>
                ))}
            </ol>
            <img className={style.image} src={props.img} alt="" />
            <p>{props.instructions}</p>


        </div>
    )
}

export default MyRecepie