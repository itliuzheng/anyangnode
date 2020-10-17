console.log(THREE);
//使用webgl.js的检测代码
if (THREE.WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(THREE.WEBGL.getWebGLErrorMessage());
}
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
/**
 * 创建简易机器人模型
 */
// 头部网格模型和组
var headMesh = sphereMesh(10, 0, 0, 0);
headMesh.name = "脑壳"
var leftEyeMesh = sphereMesh(1, 8, 5, 4);
leftEyeMesh.name = "左眼"
var rightEyeMesh = sphereMesh(1, 8, 5, -4);
rightEyeMesh.name = "右眼"
var headGroup = new THREE.Group();
headGroup.name = "头部"
headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
// 身体网格模型和组
var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
neckMesh.name = "脖子"
var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
bodyMesh.name = "腹部"
var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
leftLegMesh.name = "左腿"
var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
rightLegMesh.name = "右腿"
var legGroup = new THREE.Group();
legGroup.name = "腿"
legGroup.add(leftLegMesh, rightLegMesh);
var bodyGroup = new THREE.Group();
bodyGroup.name = "身体"
bodyGroup.add(neckMesh, bodyMesh, legGroup);
// 人Group
var personGroup = new THREE.Group();
personGroup.name = "人"
personGroup.add(headGroup, bodyGroup)
personGroup.translateY(50)
scene.add(personGroup);

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
  var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
  mesh.position.set(x, y, z);
  return mesh;
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
  var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
  mesh.position.set(x, y, z);
  return mesh;
}

scene.traverse(function (obj) {
    if(obj.type === 'Group'){
        console.log(obj.name);
    }
    if(obj.type === 'Mesh'){
        console.log('  '+ obj.name);
        obj.material.color.set(0xffff00);
    }
    if(obj.name === '左眼' | obj.name === '右眼'){
        console.log('  '+ obj.name);
        obj.material.color.set(0x000000);
    }
    console.log(obj.id);
    console.log(obj.parent);
    console.log(obj.children);

})


/**
 * 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
 */
var axiosHelper = new THREE.AxisHelper(1500)
scene.add(axiosHelper)

/**
 * 光源设置
 */
    //点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(800, 400, 1000); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 500; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 0, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// renderer.render(scene, camera);//执行渲染操作   指定场景、相机作为参数

// setInterval("render()",20)
//
// function render() {
//   renderer.render(scene,camera);
//   mesh.rotateY(0.01)
// }

// let T0 = new Date();
// function render() {
//     let T1 = new Date();
//     let t = T1 - T0;
//     T0 = T1;
//     requestAnimationFrame(render);
//     renderer.render(scene, camera);
//     mesh.rotateY(0.001 * t);
//
// }

function render() {
    renderer.render(scene, camera)
}

render()
var controls = new THREE.OrbitControls(camera, renderer.domElement) // 创建控件对象
controls.addEventListener('change', render)