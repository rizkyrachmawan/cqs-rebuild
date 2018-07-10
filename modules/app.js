var urlAPI = 'https://36.67.149.236:8424/project/api/public';
//var urlAPI = 'http://5b14effbc17fa90014771067.mockapi.io/';
var baseURL = 'http://localhost/project-ui/public_html/';
var appName = 'Dev';

// MAIN FLOW START

App = {
    init: function () {
        startApp();
    }
}

// MAIN FLOW END

function startApp() {
    console.log('Checkhing authorization...');

    if (!localStorage.getItem(appName + 'Token')) {
        console.log('No Token Detected');
        activateLoader();
        loadLoginContent();
    } else {
        console.log('Token Detected');
        loadBodyContent();

        var activeRoute = localStorage.getItem(appName + 'routeMenu');
        var activeMenuID = localStorage.getItem(appName + 'MenuID');
        var activeMenu = localStorage.getItem(appName + 'ActiveMenu');

        if (activeRoute) {
            handleAction(activeRoute, activeMenuID, activeMenu);
        }
    }

}

function loadLoginContent() {
    window['loginHandler']();
}

function loadBodyContent() {
    document.body.innerHTML = `<div id="page-container">`;
    var header = headerTemplate();
    var sidebar = sidebarTemplate();
    var dashboard = dashboardTemplate();

    var content = `
    <div id="loading">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>

	<div id="page-wrapper">
		<div id="page-header" class="bg-gradient-9">
		</div>
		<div id="page-sidebar">
		</div>
		<div id="page-content-wrapper">
		</div>
	</div>
		`;

    $("#page-container").html(content);
    $("#page-header").html(header);
    $("#page-sidebar").html(sidebar);
    $("#page-content-wrapper").html(dashboard);
    deactivateLoader();
    getSidebar();
}

function handleAction(menuRoute, idMenu, menuName) {

    if (menuRoute) {
        var target = menuRoute;
        var hTarget = target.replace('route', '');
        var hTarget = 'load' + hTarget + 'Handler';
    }
    console.log(hTarget);
    setActivePage(menuRoute, idMenu, menuName);
    switch (target) {
        case 'login':
            loginHandler();
            break;
        case 'logout':
            logoutHandler();
            break;
        default:
            try {
                var lastAction = localStorage.getItem(appName + 'CurrentAction');
                localStorage.setItem(appName + 'LastAction', lastAction);
                localStorage.setItem(appName + 'CurrentAction', hTarget);

                window[hTarget](menuName);
                //	$('.breadcrumb').html('<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li><li class="active">'+menuName+'</li>');
            } catch (err) {
                console.log('Function ' + hTarget + ' is not exist yet or ' + err)
            }
            break;
    }
}

function setActivePage(menuRoute, idMenu, menuName) {
    localStorage.setItem(appName + 'routeMenu', menuRoute);
    localStorage.setItem(appName + 'MenuID', idMenu);
    localStorage.setItem(appName + 'ActiveMenu', menuName);
}

function getActivePage() {
    return localStorage.getItem(appName + 'routeMenu');
    return localStorage.getItem(appName + 'MenuID');
    return localStorage.getItem(appName + 'ActiveMenu');
}

function getSidebar() {
    var token = getToken();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urlAPI + '/menu/getmenu',
        "method": "GET",
        "headers": {
            "x-access-token": token
        }
    }

    $.ajax(settings).done(function (response) {
        //sidebarHandler(response);		
        sidebarHandler(response);				//using dummy data
        getIdentity();
    })
            .fail(function (response) {
                localStorage.clear();
                loadLoginContent();
            })
}


//Helper

function saveToken(token) {
    if (typeof token !== 'undefined') {
        localStorage.setItem(appName + 'Token', token);
        console.log('New Token: ' + token);
    }
}

function getToken() {
//	console.log( localStorage.getItem(appName + 'Token'));
    return localStorage.getItem(appName + 'Token');
}

//animate

function loadSpinner() {
    return `
	<div id="page-loader" class="fade in hide"><span class="spinner"></span></div>
	`
}

function dropDown(menuName) {
    //.parent().prop('className');
    if ($("." + menuName).hasClass("expand")) {
        $("li").removeClass("expand");
        $("#sidebarnav").find('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(".sub-menu").hide(500);
    } else {
        $("li").removeClass("expand");
        $("#sidebarnav").find('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
        $(".sub-menu").hide(500);
        $("." + menuName).fadeIn(500).addClass('expand');
        $("." + menuName).find('.fa-caret-right').removeClass('fa-caret-right').addClass('fa-caret-down');
        $("." + menuName).find('ul').show(500);
    }
}

