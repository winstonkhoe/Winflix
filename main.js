// import * as THREE from '../three.js-master/src/Three.js'
import * as THREE from './three.js-master/build/three.module.js'

let w = window.innerWidth;
let h = window.innerHeight;
let aspect = w/h;

let persCam = new THREE.PerspectiveCamera(50, aspect, 1, 100); 
let persCam2 = new THREE.PerspectiveCamera(50, aspect, 1, 100); 
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({antialias: true});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

persCam.position.set(0,0,40);
persCam2.position.set(0,20,90);
persCam.lookAt(0,10,0);
persCam2.lookAt(0,20,0);
persCam2.lookAt.y = 50
// renderer.setClearColor(0xadd8e6);
renderer.setSize(w, h);

/*
    LIGHT
*/
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const spotLight = new THREE.SpotLight(0xFFFFFF, 0.5)
spotLight.castShadow = true;
spotLight.position.set(5, 50, 50)
// spotLight.position.y = 50
spotLight.lookAt(0, 0, 0)
scene.add(spotLight)

spotLight.shadow.focus = 1

const lightHelper = new THREE.SpotLightHelper(spotLight, 0xFF0000)
// scene.add(lightHelper)

/*
    END LIGHT
*/
import {OrbitControls}  from './three.js-master/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader}  from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
let controls = new OrbitControls(persCam, renderer.domElement)
let controls2 = new OrbitControls(persCam2, renderer.domElement)

/*
    TITLE: NETFLIX (TEXT GEOMETRY)
*/
var title;
let fontLoader = new THREE.FontLoader();
fontLoader.load('./assets/font/Bebas_Neue_Regular.json',(font)=>{
    const titleGeo = new THREE.TextGeometry("Winflix",{
        font: font,
        size: 2,
        height: 0.5
    });
    const titleMaterial = new THREE.MeshPhongMaterial({color:0xD11E25});
    // let material = new THREE.MeshNormalMaterial();
    title = new THREE.Mesh(titleGeo, titleMaterial);
    title.position.y = 10
    title.position.z = -3.1
    title.castShadow = true
    scene.add(title);
});


/*
    END TITLE
*/

/*
    FILM
*/
    /*
        POSTER FILM BASE (EXTRUDE)
    */
    const length = 4, width = 10;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 5,
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 2,
        bevelOffset: 1,
        bevelSegments: 3
    };

    const filmPosterBaseGeo = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const filmPosterBaseMaterial = new THREE.MeshStandardMaterial( { color: 0xE3E3E3, metalness: 0.1, roughness: 0 } );
    var filmPosterBase = new THREE.Mesh( filmPosterBaseGeo, filmPosterBaseMaterial ) ;
    
    filmPosterBase.position.x = 1.5
    filmPosterBase.position.y = -5
    filmPosterBase.position.z = -2.1
    
    filmPosterBase.castShadow = true;
    filmPosterBase.receiveShadow = false;
    scene.add( filmPosterBase );
    /*
        END POSTER FILM BASE
    */

    /*
        POSTER FILM (PLANE)
    */
    var textureLoader = new THREE.TextureLoader();
    const filmPosterTexture = new THREE.MeshBasicMaterial({map:textureLoader.load('./assets/img/mine-poster.jpg'), side: THREE.DoubleSide})
    const filmPosterGeo = new THREE.PlaneGeometry( 7, 12 );
    const filmPosterMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var filmPoster = new THREE.Mesh( filmPosterGeo, filmPosterTexture );
    filmPoster.position.x = 3.5
    filmPoster.castShadow = true;
    scene.add( filmPoster );

    /*
        END POSTER FILM
    */

    /*
        PLAY BUTTON (BOX)
    */
        const playButtonGeo = new THREE.BoxGeometry( 10, 10 , 10);
        const playButtonTexture = new THREE.MeshBasicMaterial({map:textureLoader.load('./assets/img/youtube-play.png')})
        var playButton = new THREE.Mesh( playButtonGeo, playButtonTexture );
        playButton.scale.set(0.5, 0.5, 0.5)
        playButton.name = "play"
        playButton.position.x = 20
        playButton.position.z = 5
        playButton.castShadow = true
        scene.add( playButton );
    /*
        END PLAY BUTTON
    */

    /*
        PAUSE BUTTON (BOX)
    */
        const pauseButtonGeo = new THREE.BoxGeometry( 10, 10 , 10);
        const pauseButtonTexture = new THREE.MeshBasicMaterial({map:textureLoader.load('./assets/img/pause-button.png')})
        var pauseButton = new THREE.Mesh( pauseButtonGeo, pauseButtonTexture );
        pauseButton.scale.set(0.5, 0.5, 0.5)
        pauseButton.name = "pause"
        pauseButton.position.x = 20
        pauseButton.position.z = 5
        // scene.add( pauseButton );
    /*
        END PLAY BUTTON
    */

    /*
        LAYAR FILM
    */
        const playFilmGeo = new THREE.PlaneGeometry(140,70);
        var video = document.getElementById('trailer')
        video.play();
        video.addEventListener( 'play', function () {

            // this.currentTime = 10;

        } );
        const VideoTexture = new THREE.VideoTexture( video )
        const videoParameter = {color: 0xFFFFFF, map: VideoTexture}
        const videoLayer = new THREE.MeshLambertMaterial(videoParameter)
        var playFilm = new THREE.Mesh(playFilmGeo, videoLayer);
        playFilm.position.x = 3.5;
        playFilm.position.y = 15;
        playFilm.position.z = -3.15;
        // playFilm.receiveShadow = true;
        // scene.add(playFilm);
    /*
        END LAYAR FILM
    */

/*
    END FILM
*/
/*
    CINEMA HALLWAY
*/

    /*
        WALL
    */
        const wallGeo = new THREE.PlaneGeometry(200,100);
        // let floorTexture = new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide})
        let wallTexture = new THREE.MeshPhongMaterial({color: 0xFFCDA9, side: THREE.DoubleSide, reflectivity: 0, shininess: 0})
        var wall = new THREE.Mesh(wallGeo, wallTexture);
        wall.position.x = 3.5;
        wall.position.y = 0;
        wall.position.z = -3.15;
        wall.receiveShadow = true;
        scene.add(wall);
    /*
        END WALL
    */

    /*
        FLOOR
    */
        const floorGeo = new THREE.PlaneGeometry(200,200);
        // let floorTexture = new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide})
        let floorTexture = new THREE.MeshBasicMaterial({map:textureLoader.load('./assets/img/karpet-xxi.jpg'), side: THREE.DoubleSide})
        var floor = new THREE.Mesh(floorGeo, floorTexture);
        floor.position.x = 3.5;
        floor.position.y = -15;
        floor.position.z = 0;
        floor.rotation.x = -Math.PI/2;
        floor.receiveShadow = true;
        scene.add(floor);
    /*
        END FLOOR
    */
/*
    END CINEMA HALLWAY
*/

/*
    SWITCH CAMERA BUTTON
*/
    const switchCameraGeo = new THREE.RingGeometry( 0, 10, 7, 21, 2, 6.3 );
    let switchCameraTexture = new THREE.MeshBasicMaterial({map:textureLoader.load('./assets/img/camera-logo.jpg'), side: THREE.DoubleSide})
    var switchCamera = new THREE.Mesh( switchCameraGeo, switchCameraTexture );
    switchCamera.name = "switchCamera"
    switchCamera.scale.set(0.5, 0.5, 0.5)
    switchCamera.position.set(-30, -5, 2)
    switchCamera.castShadow = true
    scene.add( switchCamera );
/*
    END SWITCH CAMERA BUTTON
*/

const cameraShadowHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// scene.add(cameraShadowHelper)

let loader = new GLTFLoader()

loader.load('./speaker.gltf', (e)=>{
    let model = e.scene
    model.name = 'speakerLeft'
    model.scale.set(2, 2, 2)
    model.position.x = -55
    model.position.y = 40

    model.rotation.x = Math.PI/1.5
    model.rotation.y = -Math.PI/2
    model.rotation.z = -Math.PI/3
    scene.add(model)
})

loader.load('./speaker.gltf', (e)=>{
    let model2 = e.scene
    model2.name = 'speakerRight'
    model2.scale.set(2, 2, 2)
    model2.position.x = 65
    model2.position.y = 40

    model2.rotation.x = Math.PI/1.5
    model2.rotation.y = -Math.PI/2
    model2.rotation.z = -Math.PI/3
    scene.add(model2)
})

let raycast = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let animation = true;
let filmOnPlay = false;
function onclick(event) {
    mouse.x = (event.clientX/window.innerWidth) * 2 - 1; // normalized
    mouse.y = -(event.clientY/window.innerHeight) * 2 + 1; // normalized
    
    if(!changeCam)
        raycast.setFromCamera(mouse, persCam);
    else if(changeCam)
        raycast.setFromCamera(mouse, persCam2);
    const intersects = raycast.intersectObjects(scene.children);
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.name == 'play') {
            if(!filmOnPlay)
            {
                scene.remove(title)
                scene.remove(filmPoster)
                scene.remove(filmPosterBase)
                scene.remove(wall)
                scene.remove(playButton)
                video.play();
                scene.add(playFilm)
                scene.add(pauseButton)
                // console.log("Clicked")
                changeCam = true
                filmOnPlay = !filmOnPlay
                spotLight.intensity = 0.5
                spotLight.target(playFilm)
                spotLight.location.set(0, 40, 200)
                // spotLight.lookAt(0, 100, 0)
                ambientLight.intensity = 0
                // raycast.setFromCamera(mouse, persCam2);
            }
            else
            {
                video.play();
                let rotationY = playButton.rotation.y
                scene.remove(playButton)
                scene.add(pauseButton)
                pauseButton.rotation.y = rotationY
            }
        }
        else if(intersects[i].object.name == 'pause')
        {
            video.pause();
            let rotationY = pauseButton.rotation.y
            scene.remove(pauseButton)
            scene.add(playButton)
            playButton.rotation.y = rotationY
        }
        else if(intersects[i].object.name == 'switchCamera')
            changeCam = !changeCam
    }
}
document.addEventListener('pointerdown', onclick)
let changeCam = false;

/*
    SKY BOX (BOX GEOMETRY)
*/

let skyBoxTexture = [
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-right.jpg'), side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-left.jpg'), side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-top.jpg'), side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-bottom.jpg'), side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-front.jpg'), side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        map:textureLoader.load('./assets/img/skybox/night-back.jpg'), side: THREE.DoubleSide
    })
]

const skyBoxGeo = new THREE.BoxGeometry(200, 200, 200);
// const skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF})
var skyBox = new THREE.Mesh(skyBoxGeo, skyBoxTexture);
skyBox.receiveShadow = true;
scene.add(skyBox)

/*
    END SKY BOX
*/

function animate(){
    // w = window.innerWidth;
    // h = window.innerHeight;
    // renderer.setSize(w,h);
    switchCamera.rotation.x += 0.005
    switchCamera.rotation.y += 0.005
    switchCamera.rotation.z += 0.005
    
    if(!filmOnPlay)
    {
        playButton.rotation.y += 0.005
    }
    else
    {
        pauseButton.rotation.y += 0.005
    }
    if(!changeCam)
    {
        controls2.enabled = false;
        controls.enabled = true;
        renderer.render(scene, persCam);
    }
    else
    {
        controls2.enabled = true;
        controls.enabled = false;
        renderer.render(scene, persCam2);
    }
    requestAnimationFrame(animate);
}
animate();

document.body.appendChild(renderer.domElement);