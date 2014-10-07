/* adapted for boiler plate http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene */
(function() {

var camera, scene, renderer;
var ball, left_bumper, right_bumper;


init();
console.log("initialized webgame")
animate();

function Ball() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
        color: 0xffff01,
        wireframe: true
    });
    return new THREE.Mesh(geometry, material);
};

function Bumper() {
    var geometry = new THREE.BoxGeometry(60, 475,0);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff2301,
        wireframe: true
    });
    return new THREE.Mesh(geometry, material);
};

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1500;
    scene = new THREE.Scene();

    /* load assets */
    ball = new Ball();
    left_bumper = new Bumper();
    right_bumper = new Bumper();

    scene.add(ball);
    scene.add(left_bumper);
    scene.add(right_bumper);

    left_bumper.position.x = -1600;
    left_bumper.position.y = 0;
    right_bumper.position.x = 1600;
    right_bumper.position.y = 0;

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
}

function animate(){

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame(animate);
    ball.rotation.y += .05;
    ball.rotation.x += .05;
    
    renderer.render(scene, camera);
};

})();
