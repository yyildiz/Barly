$(document).ready(function() {
    $()
    var settings = $(".settings");
    settings.click(function() {
        var sidebar = $(".sidebar");
        var background = $(".background");
        sidebar.show();
        background.show();
        $(document).mouseup(function (e) {
            if (!sidebar.is(e.target) // if the target of the click isn't the container...
                && sidebar.has(e.target).length === 0) // ... nor a descendant of the container
            {
                e.stopPropagation();
                sidebar.hide();
                background.hide();
                sidebar.unbind('click', document)
            }
        })

    })


})
