$(document).ready(function() {
    $(".increment").click(function(){
        var input = $(this).parent().find("input");
        input.val(function(i, oldVal){
            return ++oldVal;
        })
    })
    $(".decrement").click(function(){
        var input = $(this).parent().find("input");
        input.val(function(i, oldVal){
            if(oldVal <= 0) {
                return 0;
            }
            return --oldVal;
        })
    })
})
