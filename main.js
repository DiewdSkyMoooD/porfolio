import initmodel from './model.js';
import {ruter} from './router.js';
import Menu from './nav.js'
const d=document;
let path;


d.addEventListener('DOMContentLoaded',()=>{
    path=window.location.pathname;
    ruter(path)
    Menu('.hamburger','.menu','.menu li')
})

d.addEventListener('click',(e)=>{
    
    if(e.target.matches('[data-link="home"]')){
        history.replaceState(null,'home','/')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="about"]')){
        history.replaceState(null,'about','/about')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="work"]')){
        history.replaceState(null,'work','/work')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="contact"]')){
        history.replaceState(null,'contact','/contact')
        path=window.location.pathname;
        ruter(path)
    }
    //work sections
    if(e.target.matches('[data-link="weather-proyect"]')){
        history.replaceState(null,'proyecto-clima','/work/weather-proyect')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="task-proyect"]')){
        history.replaceState(null,'proyecto-tareas','/work/task-proyect')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="githubapi-proyect"]')){
        history.replaceState(null,'proyecto-githubapi','/work/githubapi-proyect')
        path=window.location.pathname;
        ruter(path)
    }
    if(e.target.matches('[data-link="api-proyect"]')){
        history.replaceState(null,'proyecto-api','/work/api-proyect')
        path=window.location.pathname;
        ruter(path)
    }
    
})


initmodel();
