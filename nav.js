export default function Menu (btn, menu, menuli){
    let $menu=document.querySelector(menu);
    let $btn=document.querySelector(btn);
    document.addEventListener('click',(e)=>{
        if(e.target.matches(btn)||e.target.matches(`${btn} *`)){
            $menu.classList.toggle("active")
            $btn.classList.toggle("is-active")
        }
        if(e.target.matches(menuli)){
            $menu.classList.remove("active")
            $btn.classList.remove("is-active")
        }
    })

}