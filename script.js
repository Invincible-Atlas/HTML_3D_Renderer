const canvas = document.getElementById("canvas");
const lock = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
var pl = [[20,20,20],[10,20,5],[4,30,20],[0,0,30]];
var pl2 = [];
var linelist=[];
var mx=0;
var my=0;
const fovSlider = document.getElementById('fov')
const cxaSlider = document.getElementById('cxa')
const cyaSlider = document.getElementById('cya')
const czaSlider = document.getElementById('cza')
var ar = canvas.height/canvas.width;
document.addEventListener("pointerlockchange", () => {
    const locked = document.pointerLockElement;
    lock.disabled = Boolean(locked);
  });
  lock.addEventListener("click", () => {
    lock.requestPointerLock();
  });
  function logMovement(event) {
    mx=event.movementX;
    my=event.movementY;
    log.insertAdjacentHTML(
      "afterbegin",
      `movement: ${event.movementX}, ${event.movementY}<br>`,
    );
    while (log.childNodes.length > 128) log.lastChild.remove();
  }
  
  const log = document.getElementById("log");
  document.addEventListener("mousemove", logMovement);
//angle ratio
//ar = canvas.height/canvas.width;

function sin(theta){
    var rad;
    rad = (theta * Math.PI) / 180;
    return Math.sin(rad);
}
function cos(theta){
    var rad;
    rad = (theta * Math.PI) / 180;
    return Math.cos(rad);
}
function tan(theta){
    var rad;
    rad = (theta * Math.PI) / 180;
    return Math.tan(rad);
}
function Xr(x,y,z,theta){
    var X;
    var Y;
    var Z;
    X = x;
    Y = y*cos(theta) - z*sin(theta);
    Z = y*sin(theta) + z*cos(theta);
    return([X,Y,Z]);
}
function Yr(x,y,z,theta){
    var X;
    var Y;
    var Z;
    X = x*cos(theta) + z*sin(theta);
    Y = y;
    Z = z*cos(theta) - x*sin(theta);
    return([X,Y,Z]);
}
function Zr(x,y,z,theta){
    var X;
    var Y;
    var Z;
    X = x*cos(theta) - y*sin(theta);
    Y = x*sin(theta) + y*cos(theta);
    Z = z;
    return([X,Y,Z]);
}

function awc(a,x){
    return(x*2*tan(a/2));
}
function transform(list,txa,tya,tza){
    var tpl;
    var ttpl = [];
    for(i in list){
        tpl = Xr(list[i][0],list[i][1],list[i][2],txa);
        tpl = Yr(tpl[0],tpl[1],tpl[2],tya);
        tpl = Zr(tpl[0],tpl[1],tpl[2],tza);
        ttpl.push(tpl);
    }
    return(ttpl);
}
function clear(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.height,canvas.width);
}
function render(){
    var xa;
    var twx;
    var ya;
    var twy;
    
    clear();
    pl2 = transform(pl,cxaSlider.value,cyaSlider.value,czaSlider.value);
    clear();
        for(i in pl2){
            if(pl2[i][2]>=0){
            xa = fovSlider.value;
            ya = fovSlider.value*ar;
            twx=awc(xa,pl2[i][2]);
            twy=awc(ya,pl2[i][2]);
            pl2[i][0]=(pl2[i][0]*canvas.width)/awc(xa,pl2[i][2]);
            pl2[i][1]=(pl2[i][1]*canvas.height)/awc(ya,pl2[i][2]);
            ctx.fillStyle="#0000FF";
            ctx.fillRect(pl2[i][0]+(canvas.width/2),pl2[i][1]+(canvas.height/2),5,5);
        }
    }
}
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
setInterval(render,1/30);
render();xc 