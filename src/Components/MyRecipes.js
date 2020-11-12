import React, { Component } from 'react'
import ingredients from './Ingredients.json';
import style from './MyRecipes.module.css';
import MyRecepie from './MyRecipe';
import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import Background from './Pictures/addRecipeBackground.jpg'
import BackGroundAddRecipe from './BackGroundAddRecipe';
import axios from './axsios-orders';


class MyRecipes extends Component {



  state = {
    userName: "Alan",
    ingredients: Object.keys(ingredients),
    newIngredient: "",
    newIngredients: [],
    recipes: [],
    dataRecipes: [],
    stateChanged: false,
  };



  componentDidMount() {
    axios.get('https://alanrecipes1313.firebaseio.com/recipes.json')
      .then(response => {

        if (response.data !== null) {

          let objKeys = Object.keys(response.data);
          let dataArr = [];
          objKeys.forEach(key => {
            let value = response.data[key];
            dataArr.push(value);


          });
          console.log(dataArr);
          this.setState({ dataRecipes: dataArr });
        }




      });


    $("#addRecipeForm").hide();
    $("#ingredientList").hide();
    $("#recipeAddedSuccesfully").hide();






  }
  componentDidUpdate() {

  }


  userNameChangeHandler = () => {

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";

  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  addRecipeMenu = () => {
    $("#myRecipes").hide();
    $("#header").hide();
    $("#addRecipeForm").show();

    this.closeNav();
  }




  addIngredientHandler = (event) => {
    let newIngArr = [...this.state.newIngredients];
    if (this.state.newIngredient === "" || this.state.newIngredient === "Select") {
      alert("false")
      return false;
    }
    let exists = false;
    let added = false;
    for (let i = 0; i < this.state.ingredients.length; i++) {
      if (this.state.newIngredients[i] === this.state.newIngredient) {
        exists = true;

      }

    }
    if (!exists) {
      newIngArr.push(this.state.newIngredient);
      this.setState({
        newIngredients: newIngArr
      })


      let str = newIngArr.map(ing => (
        ` ${ing}`

      ));

      $("#ingredientList").show();
      $("#ingredientList").html(`<b>Ingredient list: </b>  ${str}`);
    }



  }

  selectChangeHandler = (event) => {

    this.setState({ newIngredient: event.target.value })
  }

  createRecipe = () => {
    axios.post('/recipes.json');

    let recipeName = $("#recipeName").val();
    // console.log(recipeName);
    let recipeIngredients = [...this.state.newIngredients];
    let imageUrl = $("#recipeImage").val();
    let recipeInstructions = $("textArea").val();
    //  console.log(recipeInstructions);
    let recipeArr = [...this.state.dataRecipes];
    // console.log(recipeArr);
    let count = recipeArr.length;

    let newRecipe = {
      name: recipeName,
      ingredients: recipeIngredients,
      image: imageUrl,
      instructions: recipeInstructions,
      id: count

    }

    axios.post('/recipes.json', newRecipe)
      .then(() => {


        axios.get('https://alanrecipes1313.firebaseio.com/recipes.json')
          .then(response => {

            if (response.data !== null) {

              let objKeys = Object.keys(response.data);
              let dataArr = [];
              objKeys.forEach(key => {
                let value = response.data[key];
                dataArr.push(value);


              });
              this.setState({ dataRecipes: dataArr });
              $(':input').val('');
              this.setState({ newIngredients: [] })
              $("#ingredientList").hide();
              $("#addRecipeForm").hide();
              $("#header").show();
              $("#myRecipes").show();
            };


          });


      }




      )



  }


  render() {
    return (
      <div>
        <div id="mySidenav" className={style.sidenav} >
          <a href="http://localhost:3006/myrecipes" className={style.closebtn} onClick={() => this.closeNav()}>&times;</a>
          <a href="http://localhost:3006/myrecipes">My Recipes</a>
          <button onClick={this.addRecipeMenu}>Add Recipe</button>
          <a href="http://localhost:3006/myrecipes">Add Ingredient</a>

        </div>
        <div id="recipeAddedSuccesfully"><h1>Recipe Added!</h1></div>

        <div id="header" className={style.center}><h1>My Recipes</h1>
        </div>
        <div className={style.center}>
          <a onClick={() => this.openNav()} className={style.button1}>Menu</a>
        </div>
        <div id="myRecipes" className="recipes">
          {this.state.dataRecipes.map(recipe => (
            < MyRecepie key={recipe.id}
              name={recipe.name}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              img={recipe.image}
            />
          )
          )}
        </div>

        <Container fluid id="addRecipeForm">

          <Form>
            <Row>
              <Col sm="6" className={style.formCol}>
                <h4>{this.state.userName}, Please Add Recipe</h4>
                <Form.Group >
                  <Form.Label >
                    Please enter recipe name
                                        </Form.Label>
                  <Form.Control type="text" id="recipeName" placeholder="recipe name" className={style.formEl} />

                </Form.Group>
                <Form.Group >
                  <Form.Label >
                    Please enter recipe image url
                                        </Form.Label>
                  <Form.Control type="text" id="recipeImage" placeholder="recipe image url" className={style.formEl} />

                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Please choose ingreients
                                      </Form.Label>
                  <Form.Control as="select" onChange={this.selectChangeHandler} id="selectOptions" className={style.formEl}  >
                    <option value="Select">Select</option>
                    {this.state.ingredients.map(ingredient => (
                      <option key={ingredient} id="chosenIngredient" value={ingredient}>{ingredient}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    <Button onClick={this.addIngredientHandler} className={style.formBtn} >Add ingredient</Button>
                  </Col>
                </Row>
                <Row id="ingredientList" className={style.formEl}>
                  <Col>
                    <p></p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className={style.txtAreaForm}>Recipe Instructions</Form.Label>
                      <Form.Control id="textArea" as="textarea" rows={3} className={style.formEl} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="secondary" onClick={this.createRecipe}  >Create Recipe</Button>

              </Col>
              <Col sm="6">
                <BackGroundAddRecipe />

              </Col>
            </Row>
          </Form>
        </Container>
      
      </div>


    )
  }
}

export default MyRecipes
