import * as THREE from './js/three.module.js';
import {
    SVGRenderer
} from './js/SVGRenderer.js';

let scene, renderer, mesh, camera;
const LENGTH = 100;
let length = LENGTH;

//SVGRenderer간단한 사용
//https://github.com/mrdoob/three.js/blob/master/examples/svg_lines.html
//문서 설명
//https://threejs.org/docs/#examples/en/renderers/SVGRenderer

//svg이미지 출력
//https://threejs.org/examples/#webgl_loader_svg

//로딩이 끝나면 Three.js를 숭행한다.
function init() {

    //여기에 Three.js코드를 추가한다.
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 500);

    renderer = new SVGRenderer();
    // renderer = new THREE.WebGLRenderer({
    //     preserveDrawingBuffer: true
    // });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //html 추가
    document.body.appendChild(renderer.domElement);

    let shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(LENGTH, 0);
    shape.lineTo(LENGTH, LENGTH);
    shape.lineTo(0, LENGTH);
    //geometry으로 생성될때 position.array에 반대 순서대로 적제된다. 또한 z -> y -> x 이다.

    let geometry = new THREE.ShapeGeometry(shape);
    // let geometry = new THREE.ShapeBufferGeometry(shape);
    let material = new THREE.MeshBasicMaterial({
        color: 0xffff00
    });
    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    renderer.setClearColor(0x000000, 1.0); //배경 색 변경
    renderer.render(scene, camera);

    console.log(renderer.domElement);


    //svg로 download하는 방법
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    var svg = renderer.domElement;
    //get svg source.
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    //add name spaces.
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    //add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    //convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    //set url value to a element's href attribute.
    // document.getElementById("link").href = url;

    window.location.href = url;
    let link = document.createElement('a');
    link.setAttribute('download', 'MintyPaper.svg');
    link.setAttribute('href', url);
    link.click();

};

init();