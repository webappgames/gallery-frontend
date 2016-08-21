/**
 * Created by hejny on 19.7.16.
 */


function isWallOn(objects,position){

    for(var i=0,l=objects.length,object;i<l;i++) {
        object = objects[i];

        if(object.type=='block') {


            if (
                object.position.x - 0.5 <= position.x &&
                object.position.y - 0.5 <= position.y &&
                object.position.x + 0.5 >= position.x &&
                object.position.y + 0.5 >= position.y
            ) {

                //r(object.position,position,object);

                if (object.shape == 'wall') {
                    return(true);
                }else{
                    return(false);
                }
            }
        }




    }

    return(null);

}




function wallRotation(objects,position){

    //r(position);

    var a  = isWallOn(objects,{x:position.x+0.5,y:position.y+0.5});
    var b  = isWallOn(objects,{x:position.x-0.5,y:position.y+0.5});
    var c  = isWallOn(objects,{x:position.x-0.5,y:position.y-0.5});
    var d  = isWallOn(objects,{x:position.x+0.5,y:position.y-0.5});

    //r(a,b,c,d);

    if(a && b && !c && !d){
        return(180);
    }else
    if(!a && b && c && !d){
        return(270);
    }else
    if(!a && !b && c && d){
        return(0);
    }else
    if(a && !b && !c && d){
        return(90);
    }else{
        return(false);
    }


}
