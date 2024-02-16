const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
//angle ratio
ar = canvas.height/canvas.width;

function sin(theta){
    var rad;
    rad = (deg * Math.PI) / 180;
    return Math.sin(rad);
}
function cos(theta){
    var rad;
    rad = (deg * Math.PI) / 180;
    return Math.cos(rad);
}
function tan(theta){
    var rad;
    rad = (deg * Math.PI) / 180;
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
