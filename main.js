import * as THREE from './node_modules/three/build/three.module.js';
const scene = new THREE.Scene();

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
    float intensity=1.2-dot(vertexNormal,vec3(0.0,0.5,1.0));
    vec3 atmosfera=vec3(0.5,0.2,1.0)*pow(intensity,2.5);
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
    float intensity= pow(0.82-dot(vertexNormal,vec3(0,0,1.0)),2.0);
    gl_FragColor = vec4(0.5,0.3,1.0,1.0)*intensity;

}`

//add camera
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
document.body.appendChild(renderer.domElement)


//add planet
const planet =new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        uniforms:{
            planetTexture:{
                value:new THREE.TextureLoader().load('./img/pluton.jpg')
            }
        },
        vertexShader:VSPlanet,
        fragmentShader:FSPlanet
        

}));
scene.add(planet);

//add shine
const shine =new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        vertexShader:VSShine,
        fragmentShader:FSShine,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);
shine.scale.set(1.1,1.1,1.1)
scene.add(shine)


document.addEventListener('DOMContentLoaded',()=>{
    let height=window.innerHeight;
    let width=window.innerWidth;
    console.log(height,width)
    if(height<500 || width<740){
        camara.position.z=15
    }else{
        camara.position.z=10
    }
    renderer.setSize(width,height);
    camara.aspect=width/height;
    camara.updateProjectionMatrix();
    

});
//background

//resize
window.addEventListener('resize',()=>{
    let height=window.innerHeight;
    let width=window.innerWidth;
    if(height<500 || width<740){
        camara.position.z=15
    }else{
        camara.position.z=10
    }
    renderer.setSize(width,height);
    camara.aspect=width/height;
    camara.updateProjectionMatrix();
    

})
window.onresize

//animation
const animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camara);
    planet.rotation.y+=0.0009

}
animate();