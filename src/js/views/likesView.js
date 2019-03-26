import {reduceTitle} from './searchView';
export const toggleBtn=(isLiked)=>{
    let icon=isLiked?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${icon}`)
};
export const toggleLikeMenu=(numLikes)=>
{
    document.querySelector('.likes__field').style.visibility=numLikes>0?'visible':'hidden';
};
export const renderLikes=(like)=>{
    const markup=`
    <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.image}" alt="${reduceTitle(like.title)}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${reduceTitle(like.title)}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>
    `;
    document.querySelector('.likes__list').insertAdjacentHTML('beforeend',markup);
};

export const deleteLike=(id)=>{
    const like=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    like.parentElement.removeChild(like);
};