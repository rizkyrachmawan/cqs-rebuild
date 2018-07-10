var tableUser;
var userMethod;


function loadMasterUserHandler(title){
    initMasterUser(title);
    console.log(activeMenu);
}

function initMasterUser(title){
    $('#page-content-wrapper').html(loadTemplateMasterUser());
    $('.pages').html(title);
    loadTable('tableUser', 'list-user', dataTablesUserSetting());
    addNumberToTable('tableUser');
}

function showUserModal() {
    showModal('userMethod', 'form-user', 'modal-user', 'Add User');
  //  getUnitKerja();
    getRole();
}

function saveUser() {
    save('userMethod', 'form-user', 'modal-user', 'user', 'tableUser');
}

function editUser(id_user) {
    loadRole();
    edit('userMethod', 'form-user', 'modal-user', 'Edit User', 'user', id_user, 'editUserProperties');
}

function edit(method, formID, modalID, modalTitle, link, id_user, properties) {
    window[method] = 'update';
    $('#' + formID)[0].reset();
    $('.form-group').removeClass('has-error');
    $('.help-block').empty();
    $.ajax(methodGetData(link + '/' + id_user))
            .done(function (response) {
                saveToken(response.token);
                window[properties](response);
                deactivateLoader();
                $('#' + modalID).modal('show');
                $('.modal-title').text(modalTitle);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}

function editUserProperties(response) {
    $('[name="id"]').val(response.data.id);
    $('[name="nip"]').val(response.data.nip);
    $('[name="name"]').val(response.data.name);
    $('[name="username"]').val(response.data.username);
    $('[name="password"]').attr("placeholder", "*leave empy if you don't want to change password");
    $('[name="email"]').val(response.data.email);
    $('[name="role_id"]').val(response.data.role_name);
    $('[name="isemployee_txt"]').val(response.data.isemployee_txt);
    $('#select-role').val(response.data.role_id);
}

function loadRole() {
    $.ajax(methodGetData('role'))
            .done(function (response) {
                saveToken(response.token);
                var option = '<option value="0">-- pilih role --</option>';
                $.each(response.data, function (key, value) {
                    option += '<option value="' + value.id + '">' + value.name + '</option>';
                });
                $('#select-role').html(option);
                deactivateLoader();
//                console.log(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
                deactivateLoader();
            });
}

function dataTablesUserSetting() {
    return {
        "ajax": methodGetData('user'),
        "initComplete": function (settings, json) {
            saveToken(json.token);
            deactivateLoader();
      //      checkAction();		//melakukan pemberian action sesuai dengan DB
        },
        "lengthChange": false,
        "columns": [{
            "data": "id"
        },
        {
            "data": "name"
        },
        {
            "data": "nip"
        },
        {
            "data": "unit_kerja_name"
        },
        {
            "data": "email"
        },
        {
            "data": null,
            "render": function (data, type, row) {
                return "<button class='btn btn-sm btn-primary b-edit' title='Edit' onclick='editUser(" + data.id + ")'><i class='fa fa-pencil'></i></button><button class='btn btn-sm btn-danger b-delete' title='Delete' onclick='hapusUser(" + data.id + ")'><i class='fa fa-eraser'></i></button>";
                   }
        },
        {
            "data": null,
            "render": function (data, type, row) {
                return ""
            }
        }
        ],
        responsive: {
            details: {
                type: 'column',
                target: -1
            }
        },
        columnDefs: [{
                className: 'control',
                orderable: false,
                targets: -1,
            },
            {
                targets: 0, // your case first column
                className: "text-center",
                width: "2%",
                "orderable": false,
                "searchable": false
            },
            {
                targets: 1, // your case first column
                width: "40%",
                "orderable": false,
                "searchable": false
            },
            {
                targets: 2, // your case first column
                className: "text-center",
            },
        ]
    }

}

function getRole() {
    $.ajax(methodGetData('role'))
            .done(function (response) {
                saveToken(response.token);
                var option = '<option value="0">-- pilih parent --</option>';
                $.each(response.data, function (key, value) {
                    option += '<option value="' + value.id + '">' + value.name + '</option>';
                });
                $('#select-role').html(option);
                deactivateLoader();
                $('#select-role').select2();
//                console.log(response);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert();
                deactivateLoader();
            });
}
