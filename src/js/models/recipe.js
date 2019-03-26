import axios from 'axios';
import {key1,key2,key3,key4,key5,key6,key7,key8,key9} from '../config';

export default class Recipe
{
    constructor(id)
    {
        this.id=id;
    }
    async getRecipe()
    {
        try{
            const res=await axios(`https://www.food2fork.com/api/get?key=${key7}&rId=${this.id}`);
            const data=res.data.recipe;
            this.ingredients=data.ingredients;
            this.title=data.title;
            this.image=data.image_url;
            this.author=data.publisher;
            this.url=data.source_url;
        }
        catch(err)
        {
            alert(err);
        }
    }
    calTime(){
        this.time=Math.ceil((this.ingredients.length/3))*15;
    };
    calServings()
    {
        this.servings=4;
    }
    parseIngredient()
    {
        const longUnits=['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const shortUnits=['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units=[...shortUnits,'kg','g'];
        const newIngredients=this.ingredients.map(el=>{
            let ingredient=el.toLowerCase();


            //1. Uniform units
            longUnits.forEach((unit,index)=>{
                ingredient=ingredient.replace(unit,shortUnits[index])
            });

            //2. remove paranthesis
            ingredient=ingredient.replace(/ *\([^)]*\) */g,' ');

            //3. Parse ingredients into count, unit and ingredient
            let arrIng=ingredient.split(' ');
            let unitIndex,objIng;
            // shortUnits.forEach(ele=>unitIndex=arrIng.findIndex(e=>e==ele));
            unitIndex=arrIng.findIndex(e=>units.includes(e));
            if(parseInt(arrIng[0]) && unitIndex>-1)
            {
                //count is present and unit is present
                let arrCount=arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length===1)
                {
                    count=eval(arrCount[0].replace('-','+'));
                }
                else{
                    count=eval(arrCount.join('+'));
                }
                objIng={
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                }
            }
            else if(parseInt(arrIng[0]))
            {
                //count is there but unit is absent
                objIng={
                    count:parseInt(arrIng[0]),
                    unit:'',
                    ingredient:ingredient.slice(1)
                }
            }
            else if(unitIndex===-1)
            {
                //no unit and no count 
                objIng={
                    count:1,
                    unit:'',
                    ingredient
                }
            }
            return objIng;
        });
        this.ingredients=newIngredients;
    }
    updateServings(type)
    {
        //1) update servings
        
        let newServings=type==='inc'?this.servings+1:this.servings-1;
        //2)update count
        this.ingredients.forEach(ingredient=>{
            ingredient.count*=(newServings/this.servings);
        })
        this.servings=newServings;
    }
}