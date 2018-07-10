//-----------------------AJAX SETTING ------------------------------
/*
 * fungsi untuk setingan get data via ajax
 * @param {string} url => link / url API
 * 
 */
function methodGetData(url) {
    console.log(urlAPI + '/' + url);
    return  {
        "url": urlAPI + '/' + url,
        "type": "GET",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan post data via ajax
 * @param {string} url => link / url API
 * @param {string} idForm => id form penambahan data
 * 
 */
function methodPostData(url, idForm) {
    return  {
        "url": urlAPI + '/' + url,
        "type": "POST",
        "data": $('#' + idForm).serialize(),
        "dataType": "JSON",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan put data via ajax
 * @param {string} url => link / url API
 * @param {string} idForm => id form penambahan data
 * @param {string} id => id data yang akan di update
 * 
 */
function methodPutData(url, idForm, id) {
    return  {
        "url": urlAPI + '/' + url + '/' + id,
        "type": "PUT",
        "data": $('#' + idForm).serialize(),
        "dataType": "JSON",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

/*
 * fungsi untuk setingan delete data via ajax
 * @param {string} url => link / url API
 * @param {string} id => id data yang akan di hapus
 * 
 */
function methodDeleteData(url, id) {
    return  {
        "url": urlAPI + '/' + url + '/' + id,
        "type": "DELETE",
        "beforeSend": function (request) {
            activateLoader();
            request.setRequestHeader("x-access-token", getToken());
        }
    };
}

//-----------------------END AJAX SETTING ---------------------------

//----------------------- Datatables ---------------------------
/*
 * fungsi untuk load table
 * 
 * @param {string} table => nama variable table
 * @param {string} idTable => id table
 * @param {object} settingTable => datatable properties
 * 
 */
function loadTable(table, idTable, settingTable) {
    window[table] = $('#' + idTable).DataTable(settingTable);
}

/*
 * menambahkan nomor urut ke table
 */
function addNumberToTable(table) {
    window[table].on('order.dt search.dt', function () {
        window[table].column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}

function reloadTable(table) {
    window[table].ajax.reload(function (response) {
        localStorage.setItem(appName + 'Token', response.token);
        deactivateLoader();
    });
}

//-----------------------END Datatables ---------------------------

/**
 * 
BUTTON TOGGLE NAVBAR
 */
$(document).on('click', '.navbar-toggle', function (e) {
    if($( ".sidebar" ).hasClass( "active" )){
        $(".sidebar").css({left: -220});
        $(".sidebar").removeClass( "active" );
    }   
    else{
        $(".sidebar").addClass( "active" );
        $(".sidebar").css({left: 0});
    }
});
//------------------------ End Navbar -------------------------------

/**
 * Active loader
 */
function activateLoader() {
    setTimeout(function() {
        $('#loading').fadeIn();
    }, 300);
}
function deactivateLoader() {
    setTimeout(function() {
        $('#loading').fadeOut( 400, "linear" );
    }, 300);
}
// -------------------------End Loader -------------------------------

/**
 * Checking action
 */
function checkAction() {
    var id_menu = localStorage.getItem(appName + 'MenuID');

    $.ajax(methodGetData('rolemenuaction/menu/' + id_menu))
            .done(function (response) {
                saveToken(response.token);
                deactivateLoader();
                setAction(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}
//------------------------ End Checking Action ----------------------

/**
 * 
 * Show Modal
 */
function showModal(method, formID, modalID, modalTitle) {
    //    var method = menu + 'Method';
        //activateLoader();
        window[method] = 'add';
        $('#' + formID)[0].reset();
        $('.form-group').removeClass('has-error');
        $('.help-block').empty();
        $('#' + modalID).modal('show');
        $('.modal-title').text(modalTitle);
    }
//-----------------------------End Show Modal -----------------------    

/**
 * crud action
 */
function save(method, formID, modalID, link, tableName) {
    var option;
    event.preventDefault();
    if (window[method] === 'add') {
        option = methodPostData(link, formID);
    } else {
        var id = $('[name="id"]').val();
        option = methodPutData(link, formID, id);
    }
    $.ajax(option)
            .done(function (data) {
                successNotif(data);
                saveToken(data.token);
                if (data.status) {
                    $('#' + modalID).modal('hide');
                    reloadTable(tableName);
                }
                deactivateLoader();
            })
            .fail(function (response) {
                failedNotif(response);
                deactivateLoader();
            });
}

function successNotif(response){
    console.log(response);
    $.jGrowl(response.status_txt+', '+response.message, {
        sticky: !1,
        position: "top-right",
        theme: "bg-green"
    })
}

function failedNotif(response){
    console.log(response);
    $.jGrowl(response.responseJSON.status_txt+', '+response.responseJSON.message, {
        sticky: !1,
        position: "top-right",
        theme: "bg-red"
    })
}

function hapus(link, id_user, tableName) {
    if (confirm('Are you sure delete this data?')) {
        $.ajax(methodDeleteData(link, id_user))
                .done(function (data) {
                    saveToken(data.token);
                    reloadTable(tableName);
                    deactivateLoader();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert('error deleting data');
                    deactivateLoader();
                });
    }
}