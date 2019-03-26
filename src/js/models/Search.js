import axios from "axios";
import {key1,key2,key3,key4,key5,key6,key7,key8,key9} from '../config';
export default class Search{
    constructor(query)
    {
        this.query=query;
    }
    async  getResult()
    {
        try{
            var res=await axios(`https://www.food2fork.com/api/search?key=${key7}&q=${this.query}`);
            this.result=res.data.recipes;
        }
        catch(err)
        {
            alert('Error in getting search results using search api',err);
        }
    }
}