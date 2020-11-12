import React from 'react'
import Background from './Pictures/addRecipeBackground.jpg'

function BackGroundAddRecipe() {
    var sectionStyle = {
        width: "90%",

        maxDidth: "100%",
        marginTop: "50px",
    };
    return (
        <div>
            <img src={Background} style={sectionStyle} alt="Logo" />;

        </div>
    )
}

export default BackGroundAddRecipe
