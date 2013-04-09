function post_sorter_saveOnKeyUp(e, obj, pid) {
    var code = e.which ? e.which : e.keyCode;
    
    switch(code) {
        case 13:
            post_sorter_save(obj, pid);
            return false;
    }
}

function post_sorter_save(obj, pid) {    
    jQuery.ajax({
        type: "post",
        url: ajaxurl,
        data: {
            action: "save_sort_position",
            post_id: pid,
            position: jQuery(obj).val()
        },
        dataType: "json",
        success: post_sorter_onSortSave,
        error: post_sorter_onError
    });
}

function post_sorter_onError(jqXhr, textStatus, errorThrown) {
    alert(textStatus);
}

function post_sorter_onSortSave(res) {
    window.location.href = window.location;
}

function post_sorter_moveUp(pid) {
    post_sorter_move(pid, 'up');
}

function post_sorter_moveDown(pid) {
    post_sorter_move(pid, 'down');
}

function post_sorter_move(pid, direction) {
    jQuery.ajax({
        type: "post",
        url: ajaxurl,
        data: {
            action: "move_sort_post",
            post_id: pid,
            direction: direction.toLowerCase() == 'up' ? 'up' : 'down'
        },
        dataType: "json",
        success: post_sorter_onMove,
        error: post_sorter_onError
    });
}

function post_sorter_onMove(res) {
    //window.location.href = window.location;
}