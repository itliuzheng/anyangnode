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
 * 创建网格模型
 */
    //立方形网络模块
var geometry = new THREE.BoxGeometry(400, 10, 400); //创建一个立方体几何对象Geometry

var material = new THREE.MeshLambertMaterial({  //材质对象Material
    color: 0x0000ff
});
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中


//球体网络模型
// var geometry2 = new THREE.SphereGeometry(60, 40, 40)
// var material2 = new THREE.MeshLambertMaterial({  //材质对象Material
//     color: 0xff00ff
// });
// var mesh2 = new THREE.Mesh(geometry2,material2)
// mesh2.translateY(120)
// scene.add(mesh2)

//Buffer类型几何体对象
// var geometry3 = new THREE.BufferGeometry();
// var vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     50, 0, 0, //顶点2坐标
//     0, 100, 0, //顶点3坐标
//     0, 0, 10, //顶点4坐标
//     0, 0, 100, //顶点5坐标
//     50, 0, 10, //顶点6坐标
// ])
// //3个为一组，表示一个顶点的xyz坐标
// var attribue = new THREE.BufferAttribute(vertices,3);
// geometry3.attributes.position = attribue;

// 三角面(网格)渲染模式
// var material3 = new THREE.MeshBasicMaterial({
//     color:0x0000ff, //三角面颜色
//     side:THREE.DoubleSide //两面可见
// })
// var mesh3 = new THREE.Mesh(geometry3,material3) //网格模型对象Mesh
// mesh3.translateZ(220)
// scene.add(mesh3)

/**
 *

    // 点渲染模式
    var geometry_people_1 = new THREE.BufferGeometry();
    var vertices_people_1 = new Float32Array([
        0, -100, 200, //顶点1坐标
        10, -80, 150, //顶点2坐标
        -50, -110, 100, //顶点3坐标
        0, -85, 50, //顶点4坐标
        0, -115, 0, //顶点5坐标
        0, -50, -100, //顶点6坐标
    ]);
    // //3个为一组，表示一个顶点的xyz坐标
    var attribue_people_1 = new THREE.BufferAttribute(vertices_people_1, 3);
    geometry_people_1.attributes.position = attribue_people_1;

    //类型数组创建顶点颜色color数据
    var colors = new Float32Array([
        255, 255, 255, //顶点1颜色
        255, 255, 255, //顶点2颜色
        1, 0, 0, //顶点3颜色

        1, 0, 0, //顶点4颜色
        255, 255, 255, //顶点5颜色
        255, 255, 255, //顶点6颜色
    ]);
    geometry_people_1.attributes.color = new THREE.BufferAttribute(colors, 3)

    var material_people_1 = new THREE.PointsMaterial({
        // color: 0xff0000,  //使用顶点颜色数据渲染模型，不需要再定义color属性
        vertexColors: THREE.VertexColors,
        size: 5.0 //点对象像素尺寸
    }); //材质对象
    var points = new THREE.Points(geometry_people_1, material_people_1); //点模型对象

    scene.add(points); //点对象添加到场景中


    // 线条渲染模式
    var material5 = new THREE.LineBasicMaterial({
        // color:0xff0000 //线条颜色
        vertexColors: THREE.VertexColors
    });//材质对象

    var line = new THREE.Line(geometry_people_1, material5);//线条模型对象

    scene.add(line);//线条对象添加到场景中


 */

/**
 * 设置Geometry顶点位置、顶点颜色数据
 */
//人员位置模型创建函数
function addressPoint() {
    var geometry1 = new THREE.Geometry();
    var p_arr = [
         new THREE.Vector3(0,-100,200),
        new THREE.Vector3(10, -80, 150),
        new THREE.Vector3(-50, -110, 100),
        new THREE.Vector3(0, -85, 50),
        new THREE.Vector3(0, -115, 0),
        new THREE.Vector3(0, -50, -100)
    ]

    geometry1.vertices.push(...p_arr)

    var arr = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xffffff),
        new THREE.Color(0xff0000),
        new THREE.Color(0xff0000),
        new THREE.Color(0xffffff),
        new THREE.Color(0xffffff),
    ]
    geometry1.colors.push(...arr)

    var material1 = new THREE.PointsMaterial({
            // color: 0xff0000,  //使用顶点颜色数据渲染模型，不需要再定义color属性
            vertexColors: THREE.VertexColors,
            size: 5.0 //点对象像素尺寸
        }); //材质对象
    var points = new THREE.Points(geometry1, material1); //点模型对象
    return points
}

//路径模型
function addressLine(address) {
    console.log(address.geometry);
    var material2 = new THREE.LineDashedMaterial({
        color:0xffffff,
        dashSize:10,
        gapSize:5
    })
    var line = new THREE.Line(address.geometry, material2);//线条模型对象
    //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
    line.computeLineDistances()
    return line;
}

var group = new THREE.Group()
group.name = '矿下人员定位';

var address = addressPoint();
address.name = '人员位置';
var line = addressLine(address);
line.name = '人员路径';

group.add(address,line);

var group1 = group.clone()
var group2 = group.clone()

scene.add(group,group1,group2)

// group.scale.set(2,2,2)
group.rotateY(Math.PI/6)
group1.rotateY(Math.PI/4)
group1.translateY(10)
group1.translateZ(20)
group2.translateZ(100)


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