export default ()=>{
    const view=`
    <section id="Trabajo" class="work section">
        <div class="container pt-5">
            <h1 class="text-center">Trabajos</h1>
            <div class="row">
                <div class="col-lg-6 col-sm-12 text-center pt-4">
                    <div class="proyect-name img-fluid">
                        <img class="work-img img-fluid" src="img/weather-proyect.png" alt="">
                        <h2 data-link="weather-proyect">Clima</h2>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 text-center pt-4">
                    <div class="proyect-name img-fluid">
                        <img class="work-img img-fluid" src="img/task-proyect.png" alt="">
                        <h2 data-link="task-proyect">Tareas</h2>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 text-center pt-4">
                    <div class="proyect-name img-fluid">
                        <img class="work-img img-fluid" src="img/githubapi-proyect.png" alt="">
                        <h2 data-link="githubapi-proyect">Github API</h2>
                    </div>
                </div>
                <div class="col-lg-6 col-sm-12 text-center pt-4">
                    <div class="proyect-name img-fluid">
                        <img class="work-img img-fluid" src="img/api-proyect.png" alt="">
                        <h2 data-link="api-proyect">API</h2>
                    </div> 
                </div>
            </div>
        </div>
    </section>
    `
    
    return view;
}