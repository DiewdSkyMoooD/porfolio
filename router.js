import Contact from './views/contact.js'
import Home from './views/home.js'
import About from './views/about.js'
import Work from './views/work.js'
import WorkWeather from './views/work-weather.js'
import WorkTask from './views/work-task.js'
import WorkGithub from './views/work-github.js'
import WorkAPI from './views/work-api.js'

const ruter=(ruta)=>{
let app=document.getElementById('app')
app.innerHTML="";
  switch(ruta){
    case '/':{
        app.innerHTML=Home();
    }break;
        case '/about':{
            app.innerHTML=About();
        }break;
            case '/work':{
                app.innerHTML=Work();
            }break;
                case '/contact':{
                    app.innerHTML=Contact();
                }break;
                    case '/work/weather-proyect':{
                        app.innerHTML=WorkWeather();
                    }break;
                        case '/work/task-proyect':{
                            app.innerHTML=WorkTask();
                        }break;
                        case '/work/githubapi-proyect':{
                            app.innerHTML=WorkGithub();
                        }break;
                        case '/work/api-proyect':{
                            app.innerHTML=WorkAPI();
                        }break;
                        default:
                            console.log("any more")
    }  
}

export {ruter}