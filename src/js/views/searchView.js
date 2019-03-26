import {elements} from "./base";

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value='';
};

export const clearList=()=>{
    elements.resultList.innerHTML='';
    elements.buttonShow.innerHTML='';
};

export const highlightSelected=id=>{
    document.querySelectorAll('.results__link--active').forEach(e=>e.classList.remove('results__link--active'));

    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
};

export const reduceTitle=(title,limit=20)=>{
    if(title.length>limit)
    {
        const newTitle=[];
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=17)
            {
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderList=(recipe)=>{
    const markup=`
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${reduceTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
    `;
    elements.resultList.insertAdjacentHTML('beforeend',markup);
};

export const createButton=(page,type)=>
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1:page+1}>
    <span>Page ${type==='prev'?page-1:page+1}</span>    
    <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
    </button>
    `;

export const renderButton=(page,recipe,resPerPage)=>{
    const pages=Math.ceil(recipe.length/resPerPage);
    let button;
    if(page===1&&pages>1)
        button=createButton(page,'next');
    else if(page<pages)
    {
        button=`
        ${createButton(page,'prev')}
        ${createButton(page,'next')}
        `
    }
    else if(page==pages&&pages>1)
    {
        button=createButton(page,'prev');
    }
    elements.buttonShow.insertAdjacentHTML('afterbegin',button);
};

export const renderResults=(recipe,page=1,resPerPage=10)=>{
    let start=(page-1)*resPerPage;
    let end=page*resPerPage;
    recipe.slice(start,end).forEach(renderList);
    renderButton(page,recipe,resPerPage);
};



























