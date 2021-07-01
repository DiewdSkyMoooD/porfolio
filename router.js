import Contact from './views/contact.js'
import Home from './views/home.js'
import About from './views/about.js'
import Work from './views/work.js'
import NotFount from './views/404.js';
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
                default:
                    app.innerHTML=NotFount();
    }  
}

export {ruter}