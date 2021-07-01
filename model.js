import * as THREE from './node_modules/three/build/three.module.js';
const scene = new THREE.Scene();

export default function init(){
//shaders
const VSPlanet=`
varying vec2 vertexUV;
varying vec3 vertexNormal;
void main(){
    vertexUV=uv;
    vertexNormal=normalize(normalMatrix*normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`
const FSPlanet=`
uniform sampler2D planetTexture;
varying vec2 vertexUV;
varying vec3 vertexNormal;
void main(){
    float intensity=1.2-dot(vertexNormal,vec3(0.0,0.3,1.0));
    vec3 atmosfera=vec3(0.5,0,0.5)*pow(intensity,2.5);
    gl_FragColor = vec4(atmosfera+texture2D(planetTexture,vertexUV).xyz,1.0);

}`
const VSShine=`
varying vec3 vertexNormal;
void main(){
    vertexNormal=normalize(normalMatrix*normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`
const FSShine=`
varying vec3 vertexNormal;
void main(){
    float intensity= pow(0.72-dot(vertexNormal,vec3(0,0,1.0)),2.0);
    gl_FragColor = vec4(0.5,0,0.5,1.0)*intensity;

}`
//add camera<
const camara = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight, 0.1,1000
);
//renderer
const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
//add planet
const planet =new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        uniforms:{
            planetTexture:{
                value:new THREE.TextureLoader().load('./img/purple.jpg')
            }
        },
        vertexShader:VSPlanet,
        fragmentShader:FSPlanet
}));
//add shine
const shine =new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader:VSShine,
        fragmentShader:FSShine,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent:true
    })
);
shine.scale.set(1.1,1.1,1.1)
//group
let grupo=new THREE.Group()
grupo.add(planet)
grupo.add(shine)
scene.add(grupo)
//fondo
//red:ff0000, blue:062d89 , purple:8f00ff
let ambiente=new THREE.AmbientLight(0x000000);
scene.add(ambiente)
let redlight=new THREE.PointLight(0x8f00ff,5,30);
redlight.position.set(15,0,0)
scene.add(redlight)
let bluelight=new THREE.PointLight(0x8f00ff,5,30);
bluelight.position.set(-15,0,0)
scene.add(bluelight)
let arrparticles=[];
let loader = new THREE.TextureLoader().load('./img/smoke.png',function(texture){
    let geo=new THREE.PlaneBufferGeometry(30,30);
    let material= new THREE.MeshLambertMaterial({
    map:texture,
    transparent:true       
    });

    for(let i=0;i<250;i++){
        let particle=new THREE.Mesh(geo,material);
        particle.position.set(
            Math.random()*120-60,
            Math.random()*120-60,
            Math.random()*30-40
        )
        particle.rotation.z=Math.random()*2*Math.PI
            particle.material.opacity=0.55
        arrparticles.push(particle)
        scene.add(particle)
    }

})

//load
document.addEventListener('DOMContentLoaded',()=>{
    let height=window.innerHeight;
    let width=window.innerWidth;
    if(height<500 || width<740){
        camara.position.z=19
    }else{
        camara.position.z=13
    }
    renderer.setSize(width,height);
    camara.aspect=width/height;
    camara.updateProjectionMatrix();
    

});
//resize
window.addEventListener('resize',()=>{
    let height=window.innerHeight;
    let width=window.innerWidth;
    if(height<500 || width<740){
        camara.position.z=19
    }else{
        camara.position.z=13
    }
    renderer.setSize(width,height);
    camara.aspect=width/height;
    camara.updateProjectionMatrix();
})
// 
let mouse={
    x:0,
    y:0
}
document.addEventListener('mousemove',(e)=>{
    mouse.x=(e.clientX/innerWidth)*2-1.5
    mouse.y=(e.clientY/innerHeight)*2-1.5
})


//animation
const animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camara);
    planet.rotation.y+=0.0025
    grupo.position.x=(mouse.x)*1;
    grupo.position.y=(mouse.y)*-1
    arrparticles.forEach(p=>{
        p.rotation.z-=0.003
    })

    if(Math.random()>0.99){
        bluelight.position.set(
            Math.random()*15,
            Math.random()*15,
            0
        )
            bluelight.power=Math.random()*50;
    }
    if(Math.random()>0.99){
        redlight.position.set(
            Math.random()*-15,
            Math.random()*15,
            0
        )
            redlight.power=Math.random()*50;
    }
    
}
animate();

}
