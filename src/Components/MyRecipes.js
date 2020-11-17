import React, { Component } from 'react'
import ingredients from './Ingredients.json';
import style from './MyRecipes.module.css';
import MyRecepie from './MyRecipe';
import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
//import BackGroundAddRecipe from './BackGroundAddRecipe';
import axios from './axsios-orders';
import Modal from '../Components/UI/Modal/Modal';
import plusSign from '../Components/Pictures/add.png';


class MyRecipes extends Component {

  state = {
    userName: "",
    ingredients: Object.keys(ingredients),
    newIngredient: "",
    newIngredients: [],
    recipesKeyAndName: [],
    dataRecipes: [],
    stateChanged: false,
    erasing: false,
    deleteRecipeName: null,
    currentInstructions: '',
    showInstructions: false,
    menu: false,
    menuFloat: false

  };


  componentDidMount() {
    $("#pleaseLogin").hide();

    let userName = '';
    if (localStorage && localStorage.getItem('userName')) {
      userName = JSON.parse(localStorage.getItem('userName'));
    }
    console.log(userName)
    if (userName === '') {
      $("#menubtn").hide();
      $("#pleaseLogin").show();


    }
    this.setState({ userName: userName })


    this.getAllRecipesFromServer();


  }



  userNameChangeHandler = () => {

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";

  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";

  }
  toggleNav() {
    if (this.state.menu) {
      document.getElementById("mySidenav").style.width = "0";
      this.setState({
        menu: false
      })

    }
    else {
      document.getElementById("mySidenav").style.width = "250px";
      this.setState({
        menu: true
      })
    }
  }
  addRecipeMenu = () => {
    this.setState({ menuFloat: true })
    $("#myRecipes").hide();
    $("#header").hide();
    $("#addRecipeForm").show();

    this.toggleNav();
  }


  eraseHandler = (recipeName) => {


    this.setState({
      erasing: true,
      deleteRecipeName: recipeName
    })
  }


  addIngredientHandler = (event) => {
    $("#emptyIngArr").hide();
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
        id: recipeName,
        userName: this.state.userName

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
                  if (value["userName"] === this.state.userName) {


                    dataArr.push(value);


                    let currentKeyAndName = {
                      key: key,
                      id: value.id
                    }
                    let arrKeyAndName = [...this.state.recipesKeyAndName];
                    arrKeyAndName.push(currentKeyAndName);
                    this.setState({ recipesKeyAndName: arrKeyAndName })

                  }




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
            if (value["userName"] === this.state.userName) {

              dataArr.push(value);
              let currentKeyAndName = {
                key: key,
                id: value.id
              }
              let arrKeyAndName = [...this.state.recipesKeyAndName];
              arrKeyAndName.push(currentKeyAndName);
              this.setState({ recipesKeyAndName: arrKeyAndName })


            }

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

      <div className={style.myRecipesMainDiv}>
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
          <a href="http://localhost:3000/myrecipes" className={style.closebtn} onClick={() => this.toggleNav()}>&times;</a>
          <a href="http://localhost:3000/myrecipes">My Recipes</a>
          <button onClick={this.addRecipeMenu}>Add Recipe</button>

        </div>
        <div id="recipeAddedSuccesfully"><h1>Recipe Added!</h1></div>

        <div id="header" className={style.myRecipesHeader}><h1>My Recipes </h1>
        </div>
        <div className={style.center}>
          <Button id="menubtn" style={this.state.menuFloat ? { float: "left" } : { float: "none" }} onClick={() => this.toggleNav()} variant="primary">Menu</Button>

          <h3 style={{ color: "white" }} id="pleaseLogin">Please Login To See Your Recipes</h3>
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
              <Col sm="4"></Col>
              <Col sm="4" className={style.formCol}>
                <h4>{this.state.userName}, Please Add Recipe</h4>
                <Form.Group >
                  <Row>
                    <Col sm="6"><Form.Label >
                      Recipe Name
                    </Form.Label></Col>
                    <Col sm="6">
                      <Form.Control type="text" id="recipeName" placeholder="recipe name" />

                    </Col>
                    <Col sm="4"></Col>
                  </Row>


                </Form.Group>
                <Form.Group >
                  <Row>
                    <Col sm="6"><Form.Label >
                      Recipe Image Link
                    </Form.Label></Col>
                    <Col sm="6">
                      <Form.Control type="text" id="recipeImage" placeholder="recipe image url" />

                    </Col>
                    <Col sm="4"></Col>
                  </Row>


                </Form.Group>
                <Form.Group >
                  <Row>
                    <Col sm="6"><Form.Label >
                      Choose Ingredients
                    </Form.Label>
                    </Col>
                    <Col sm="6">
                      <Form.Control as="select" onChange={this.selectChangeHandler} id="selectOptions"  >
                        <option value="Select">Select</option>
                        {this.state.ingredients.map(ingredient => (
                          <option key={ingredient} id="chosenIngredient" value={ingredient}>{ingredient}</option>
                        ))}
                      </Form.Control>

                    </Col>
                    <Col sm="4"></Col>
                  </Row>

                </Form.Group>



                <Row>
                  <Col>
                    
                      <img className={style.plusBtn} onClick={this.addIngredientHandler} src={plusSign} style={{ width: "50px", height: "50px" }} />
                    <p id="emptyIngArr" style={{ color: "gold", fontSize: "20px", fontWeight: "bold" }}>*Please add at least one ingredient</p>

                  </Col>
                </Row>
                <Row id="ingredientList" >
                  <Col>
                    <p></p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label style={{ marginTop: "40px" }} >Recipe Instructions</Form.Label>
                      <Form.Control id="textArea" as="textarea" rows={3} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="outline-dark" onClick={this.createRecipe} style={{ color: "white", backgroundColor: "forestgreen" }}>Create Recipe</Button>

              </Col>

            </Row>
          </Form>
        </Container>

      </div>

    )
  }
}

export default MyRecipes
