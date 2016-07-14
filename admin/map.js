/**
 * Created by Pavel on 14.07.2016.
 */



$(function(){

    
    





    var table = '<table>';
    for(var y=0;y<10;y++){
        table += '<tr>';
        for(var x=0;x<10;x++){
            table += '<td data-material="" data-x="'+x+'" data-y="'+y+'">';
            table += cell;
            table += '</td>';
        }
        table += '</tr>';
    }
    table += '<table>';
    
    
    
    var $table = $(table);


    $table.find('td').click(function(){
        
        
        var $this = $(this);
        //var x = $this.attr('data-x');
        //var y = $this.attr('data-y');
        var material = $this.attr('data-material');


        if(material==''){
            material='stone';
        }else{
            material='';
        }


        $this.attr('data-material',material);
        
    });
    
    

    $('#admin-table').html($table);



    
    
    


    
    
    
});