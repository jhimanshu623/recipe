export const elements={
    searchInput:document.querySelector('.search__field'),
    searchForm:document.querySelector('.search'),
    resultList:document.querySelector('.results__list'),
    result:document.querySelector('.results'),
    buttonShow:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe')
};


export const loader=(parent)=>{
    const load=`
    <div class="loader">
        <svg>
            <use href='img/icons.svg#icon-cw'></use>
        </svg>    
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin',load);
};

export const clearLoader=()=>{
    document.querySelector('.loader').parentElement.removeChild(document.querySelector('.loader'));
};