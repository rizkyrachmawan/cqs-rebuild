function loginHandler() {
    document.body.innerHTML = loginTemplate();
    deactivateLoader();
}


function loginProceedHandler() {
	event.preventDefault();
    
    var data = $('#login-form').serializeArray();

	var settings = {
		"async": true,
		"dataType": "JSON",
		"crossDomain": true,
		"url": urlAPI + '/user/login',
		"type": "POST",
		"headers": {},
		"mimeType": "multipart/form-data",
		"data": data,
        "beforeSend": function (request) {
            activateLoader();
        }
	}

	$.ajax(settings)
		.done(function (response) {
			saveToken(response.token);
            deactivateLoader();
			loadBodyContent();
			successNotif(response);

		})
		.fail(function (response) {
            deactivateLoader();
            failedNotif(response);
        })

}

function getIdentity() {
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": urlAPI + '/user/me/role',
        "method": "GET",
        "beforeSend": function (request) {
            request.setRequestHeader("x-access-token", getToken());
        }
    };

    $.ajax(settings)
		.done(function (response) {
			console.log(response);
			$('.username-account').html(response.data[0].user_name);
			$('.username-account-drop').html(response.data[0].user_name+'<i>'+response.data[0].role_name+'</i>');
			deactivateLoader();
		})
		.fail(function (response) {
			alert(response);
		});
}

function logoutProceedHandler() {
	event.preventDefault();

	var settings = {
		"async": true,
		"dataType": "JSON",
		"crossDomain": true,
		"url": urlAPI + '/user/logout',
		"type": "POST",
		"mimeType": "multipart/form-data",
        "beforeSend": function (request) {
            request.setRequestHeader("x-access-token", getToken());
            activateLoader();
        }
	}

	$.ajax(settings)
		.done(function (response) {
			localStorage.clear();
			loadLoginContent();
			successNotif(response);

		})
		.fail(function (response) {
            deactivateLoader();
            alert(response.responseJSON.status,response.responseJSON.message);
        })

}
