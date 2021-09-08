window.onload=initCSS3D;

var hotPoints=[
    {
        position:{
            x:0,
            y:0,
            z:-476
        },
        detail:{
            "title":"信息点1"
        }
    },
    {
        position:{
            x:100,
            y:0,
            z:476
        },
        detail:{
            "title":"信息点2"
        }
    }
];

function initCSS3D(){
    var s = new C3D.Stage();
    s.size(window.innerWidth, window.innerHeight).update();
    document.getElementById('container').appendChild(s.el);

    var box = new C3D.Skybox();
    box.size(954).position(0, 0, 0).material({
        front: {image: "images/scene_front.jpeg"},
        back: {image: "images/scene_back.jpeg"},
        left: {image: "images/scene_right.jpeg"},
        right: {image: "images/scene_left.jpeg"},
        up: {image: "images/scene_top.jpeg"},
        down: {image: "images/scene_bottom.jpeg"},

    }).update();
    s.addChild(box);

    initPoints();

    function loop() {
        angleX += (curMouseX - lastMouseX + lastAngleX - angleX) * 0.3;
        angleY += (curMouseY - lastMouseY + lastAngleY - angleY) * 0.3;

        s.camera.rotation(angleY, -angleX, 0).updateT();
        requestAnimationFrame(loop);
    }

    loop();

    var isMoving = false;
    var lastMouseX = 0;
    var lastMouseY = 0;
    var curMouseX = 0;
    var curMouseY = 0;
    var lastAngleX = 0;
    var lastAngleY = 0;
    var angleX = 0;
    var angleY = 0;

    document.addEventListener("mousedown", mouseDownHandler);

    document.addEventListener("mouseup", mouseUpHandler);

    function mouseDownHandler(evt) {
        lastMouseX = evt.pageX;
        lastMouseY = evt.pageY;
        lastAngleX = angleX;
        lastAngleY = angleY;
        curMouseX = evt.pageX;
        curMouseY = evt.pageY;

        document.addEventListener("mousemove", mouseMoveHandler);
    }

    function mouseMoveHandler(evt) {
        curMouseX = evt.pageX;
        curMouseY = evt.pageY;
    }

    function mouseUpHandler(evt) {
        curMouseX = evt.pageX;
        curMouseY = evt.pageY;

        document.removeEventListener("mousemove", mouseMoveHandler);
    }

    function initPoints(){
        var poiObjects = [];
        for(var i=0;i<hotPoints.length;i++){
            var _p = new C3D.Plane();

            var r = Math.atan2(hotPoints[i].position.z-0,0-0) * 180 / Math.PI+90;

            _p.size(207, 162).position(hotPoints[i].position.x,hotPoints[i].position.y,hotPoints[i].position.z).rotation(0,r,0).material({
                image: "images/hot.png",
                repeat: 'no-repeat',
                bothsides: false,
            }).update();
            s.addChild(_p);

            _p.el.detail = hotPoints[i].detail;

            _p.on("click",function(e){
                console.log(e.target.detail.title);
            })
        }
    }
}