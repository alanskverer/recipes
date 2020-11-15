import React, { Component } from 'react'
import ingredients from './Ingredients.json';
import style from './MyRecipes.module.css';
import MyRecepie from './MyRecipe';
import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import BackGroundAddRecipe from './BackGroundAddRecipe';
import axios from './axsios-orders';
import Modal from '../Components/UI/Modal/Modal';


class MyRecipes extends Component {



  state = {
    userName: "Alan",
    ingredients: Object.keys(ingredients),
    newIngredient: "",
    newIngredients: [],
    recipesKeyAndName: [],
    dataRecipes: [],
    stateChanged: false,
    erasing: false,
    deleteRecipeName: null,
    currentInstructions: '',
    showInstructions: false

  };



  componentDidMount() {
    this.getAllRecipesFromServer();




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


  eraseHandler = (recipeName) => {


    this.setState({
      erasing: true,
      deleteRecipeName: recipeName
    })
  }


  addIngredientHandler = (event) => {
    let newIngArr = [...this.state.newIngredients];
    if (this.state.newIngredient === "" || this.state.newIngredient === "Select") {

      return false;
    }
    let exists = false;

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
    if (this.state.newIngredients.length > 0) {
      $("#emptyIngArr").hide();
      axios.post('/recipes.json');
      let recipeName = $("#recipeName").val();
      let recipeIngredients = [...this.state.newIngredients];
      let imageUrl = $("#recipeImage").val();
      let recipeInstructions = $("textArea").val();

      let newRecipe = {
        name: recipeName,
        ingredients: recipeIngredients,
        image: imageUrl,
        instructions: recipeInstructions,
        id: recipeName

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

                  let currentKeyAndName = {
                    key: key,
                    id: value.id
                  }
                  let arrKeyAndName = [...this.state.recipesKeyAndName];
                  arrKeyAndName.push(currentKeyAndName);
                  this.setState({ recipesKeyAndName: arrKeyAndName })


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
    else {
      $("#emptyIngArr").show();
    }





  }
  getAllRecipesFromServer = () => {

    this.setState({ dataRecipes: [] });

    axios.get('https://alanrecipes1313.firebaseio.com/recipes.json')
      .then(response => {


        let dataArr = [];
        if (response.data !== null) {

          let objKeys = Object.keys(response.data);

          objKeys.forEach(key => {

            let value = response.data[key];
            dataArr.push(value);
            let currentKeyAndName = {
              key: key,
              id: value.id
            }
            let arrKeyAndName = [...this.state.recipesKeyAndName];
            arrKeyAndName.push(currentKeyAndName);
            this.setState({ recipesKeyAndName: arrKeyAndName })



          });
          this.setState({ dataRecipes: dataArr });
        }




      });


    $("#addRecipeForm").hide();
    $("#ingredientList").hide();
    $("#recipeAddedSuccesfully").hide();
    $("#emptyIngArr").hide();






  }


  cancelDeleteHandler = () => {
    this.setState({
      erasing: false,
      deleteRecipeName: null
    })
  }
  deleteRecipeHandler = () => {
    this.setState({ erasing: false })
    let deleteRecipeName = this.state.deleteRecipeName;
    let arr = this.state.recipesKeyAndName;
    let obj = arr.find(o => o.id === deleteRecipeName);
    let deleteKey = obj["key"];

    axios.delete(`https://alanrecipes1313.firebaseio.com/recipes/${deleteKey}.json`)
      .then(() => {
        this.getAllRecipesFromServer()
      }

      )

  }
  showInstructionsHandler = (recipeName) => {
    console.log(this.state.dataRecipes)
    let tempArr = [...this.state.dataRecipes]
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].id === recipeName) {
        this.setState({
          currentInstructions: tempArr[i].instructions,
          showInstructions: true
        })
      }

    }
  }
  closeInstructionsModal = () => {
    this.setState({ showInstructions: false })
  }


  render() {
    return (
      <div>
        <Modal show={this.state.erasing}>
          <p style={{ textAlign: 'center' }}>Are you sure you want to delete this recipe?</p>
          <Button variant="danger" style={{ margin: '5px' }} onClick={this.deleteRecipeHandler} >Delete</Button>
          <Button variant="secondary" style={{ margin: '5px' }} onClick={this.cancelDeleteHandler}>Cancel</Button>

        </Modal>
        <Modal show={this.state.showInstructions} >
          <div className={style.modalInstructions}>
          
          <h5>Recipe instructions</h5>
          <p>{this.state.currentInstructions}</p>
          </div>
          
          <Button variant="secondary" style={{ marginTop: '25px' }} onClick={this.closeInstructionsModal}>Close</Button>

        </Modal>


        <div id="mySidenav" className={style.sidenav} >
          <a href="http://localhost:3000/myrecipes" className={style.closebtn} onClick={() => this.closeNav()}>&times;</a>
          <a href="http://localhost:3000/myrecipes">My Recipes</a>
          <button onClick={this.addRecipeMenu}>Add Recipe</button>
          <a href="http://localhost:3000/myrecipes">Add Ingredient</a>

        </div>
        <div id="recipeAddedSuccesfully"><h1>Recipe Added!</h1></div>

        <div id="header" className={style.center}><h1>My Recipes </h1>
        </div>
        <div className={style.center}>
          <button onClick={() => this.openNav()} className={style.button1}>Menu</button>
        </div>
        <div id="myRecipes" className="recipes" >
          {this.state.dataRecipes.map(recipe => (
            < MyRecepie key={recipe.name}
              name={recipe.name}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              showInstructions={() => this.showInstructionsHandler(recipe.name)}
              img={recipe.image}
              mod={() => this.eraseHandler(recipe.name)
              }
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
                    <p id="emptyIngArr" style={{ color: "red" }}>Please add at least one ingredient!</p>

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
