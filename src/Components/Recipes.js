import React, { useState, useEffect } from 'react';
import '../App.css';
import Recepie from './Recipe';


function Recipes() {

    const app_id = "1dfe8926"
    const app_key = "c1280f70d3cf47c876205aeb6befb9d7	"
    const examplereq = `https://api.edamam.com/search?q=chicken&app_id=${app_id}&app_key=${app_key}`


    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');
    const [header, setHeader] = useState('');
    var hasResults;
    var count = 0;






    useEffect(() => {

        getRecipis();
    }, [query])

    const getRecipis = async () => {
        const response = await fetch
            (`https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`
            );
        const apiData = await response.json()
        //console.log(apiData);
        hasResults = (apiData.count > 0) ? true : false;

        //console.log(apiData.hits);

        setData(apiData.hits);

        defineHeader();







        // console.log(apiData.hits);


    }
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        //setSearch('');

    }

    const searchNameHandler = (event) => {
        let newSearch = event.target.value;
        setSearch(newSearch);

    }
    const defineHeader = () => {

        if (hasResults) {

            setHeader(`Showing ${search} recipes`);
            setSearch('');

        }
        else if (!hasResults && query != '') {

            setHeader(`No matches, please search again`)
        }



    }





    return (
        <div className="onlineRecipes">
            <h1 className="onlineSerchBox">Search For Online Recipe</h1>
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={searchNameHandler} placeholder="Search for recipe" />
                <button className="search-button" type="submit">
                    Search
        </button>

            </form>
            <h2 className="onlineSerchBox">{header}</h2>
            <br />
            <div className="recipes">
                {data.map(recipe => (
                    <Recepie key={recipe.recipe.calories}
                        title={recipe.recipe.label}
                        ingredients={recipe.recipe.ingredients}
                        calories={recipe.recipe.calories}
                        img={recipe.recipe.image}
                        url={recipe.recipe.url} />
                )
                )}
            </div>
        </div>
    );
}

export default Recipes;
