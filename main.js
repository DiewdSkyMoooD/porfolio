import * as THREE from './node_modules/three/build/three.module.js';
const scene = new THREE.Scene();


//shaders
const VS=`
varying vec2 vertexUV;
void main(){
    vertexUV=uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}

`
const FS=`
uniform sampler2D planetTexture;
varying vec2 vertexUV;
void main(){
    
    gl_FragColor = vec4(vec3(0,0,0)+texture2D(planetTexture,vertexUV).xyz,1.0);

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
document.body.appendChild(renderer.domElement);

//add geometry
const shpere =new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.ShaderMaterial({
        uniforms:{
            planetTexture:{
                value:new THREE.TextureLoader().load('./img/pluton.jpg')
            }
        },
        vertexShader:VS,
        fragmentShader:FS
        

}));
scene.add(shpere);
camara.position.z =15

//animation
const animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camara);
}
animate();