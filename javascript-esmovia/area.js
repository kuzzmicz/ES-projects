function circle(r){
    return r*r*3.14;
    }
    
    function triangle(base, height){
        return (base*height)/2;
        }
    
    function square(side){
    return side*side;
    }
    
    module.exports = {circle, triangle, square};