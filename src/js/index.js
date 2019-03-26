import Search from "./models/Search";
import * as searchView from './views/searchView';
import {elements,loader,clearLoader} from './views/base';
import Recipe from './models/recipe';
import * as recipeView from './views/recipeView';
import List from "./models/shoppingList";
import * as listView from "./views/shopListView";
import Likes from "./models/likes";
import * as likeView from "./views/likesView";

const state={};
/*
******SEARCH CONTROLLER********
*/
const controlSearch=async()=>
{
        //1 get the query from view
        const query=searchView.getInput();

        //3 create new object and save it into state
        state.search=new Search(query);

        //2 set up the ui
        searchView.clearInput();
        searchView.clearList();
        loader(elements.result);
        try{
         //4  search recipe using api
         await state.search.getResult();
    
         //5 display in ui
         clearLoader();
         searchView.renderResults(state.search.result);
        }
        catch(err){
            alert('Error in getting results');
        }
        
}
elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});

elements.buttonShow.addEventListener('click',e=>{
    searchView.clearList(); 
    const btn=parseInt(e.target.closest('.btn-inline').dataset.goto);   
    searchView.renderResults(state.search.result,btn);
});

/*
******RECIPE CONTROLLER********
*/ 

const controlRecipe=async()=>
{
    //1 get the id from url
    const id=window.location.hash.replace('#','');
    if(id)
    {
        //2 ready the UI for recipe
        recipeView.clearRecipe();
        //highlight the selected recipe
        if(state.search)
            searchView.highlightSelected(id);
        //add the loader
        loader(elements.recipe);
        //3 create the recipe object
            state.recipe=new Recipe(id);
        try{
              //4 get the results from recipe api
              await state.recipe.getRecipe();
              state.recipe.parseIngredient();
              //5 calulate time and servings
               state.recipe.calTime();
               state.recipe.calServings();
              //6render results on  UI
              clearLoader();
              recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
            // 7)update servings
            // bindUpdate();      

        }
        catch(err)
        {
            console.log(err);
            alert('Error in processing recipe');
        }
    }
}

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

/*********
 * LIST CONTROLLER
 **********/
const controlList=()=>
{
    //1) create a new list if there is none yet
    if(!state.list)
    {
        state.list=new List();
    }
        

    //2) Add each ingredient to the list and the ui
    state.recipe.ingredients.forEach(e=>{
        const item=state.list.addListItem(e.count,e.unit,e.ingredient);
        listView.addItem(item);
    })
};
/*********
 * LIKE CONTROLLER
 **********/

const controlLike=()=>{
    if(!state.likes)
        state.likes=new Likes();
    const id=state.recipe.id;
    //curently not liked recipe
    if(!state.likes.isLiked(id))
    {
        //add the recipe to the likes list
        const like=state.likes.addLike(id,state.recipe.title,state.recipe.author,state.recipe.image);
        //toggle the button
        likeView.toggleBtn(true);
        //display on the ui
        likeView.renderLikes(like);
    }
    //currently liked recipe
    else{
        //remove the recipe to the likes list
        state.likes.deleteLike(id);
        //toggle the button
        likeView.toggleBtn(false);
        //display on the ui
        likeView.deleteLike(id);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load',()=>{
    state.likes=new Likes();
    state.likes.getStorage();
    likeView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(e=>{
        likeView.renderLikes(e);
    });
});

/******* 
**********USING MATCHES
*********/
document.querySelector('.shopping__list').addEventListener('click',e=>{
    const id=e.target.closest('.shopping__item').dataset.id;
    if(e.target.matches('.shopping__delete,.shopping__delete *'))
    {
        //delete from the state list
        state.list.deleteListItem(id);
        //delete from the ui
        listView.deleteItem(id);
    }
    else if(e.target.matches('.changeCount'))
    {
        const val=e.target.value;
        state.list.updateCount(id,val);
    }
});



document.querySelector('.recipe').addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease,.btn-decrease *'))
    {
        if(state.recipe.servings>1)
        {
            state.recipe.updateServings('dec');
            recipeView.updateServingsView(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase,.btn-increase *'))
    {
        state.recipe.updateServings('inc');
        recipeView.updateServingsView(state.recipe);
    }
    else if(e.target.matches('.recipe__btn-add,.recipe__btn-add *'))
    {
        controlList();
    }
    else if(e.target.matches('.recipe__love,.recipe__love *'))
    {
        controlLike();
    }
});
