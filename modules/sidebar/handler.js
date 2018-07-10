function sidebarHandler(response){

    var side="";
	side+='<li class="header"><span>Main Navigation</span></li><li class="divider"></li>';
	
	$.each(response.data, function (index, value) {
		var active = value.name.replace(/\s/g, '');        
        
		if(value.child.length!='0'){	
			side+='<li class="'+active+'" onCLick="dropDown(\'' + active + '\')"><a href="javascript:;" title="Elements" class="sf-with-ul"><i class="'+ value.icon +'"></i><span>'+value.name+'</span></a><div class="sidebar-submenu"><ul>';

            $.each(value.child, function (index, value) {
            	side+='<li><a href="#" onClick="handleAction(\'' + value.link + '\',\'' + value.id + '\',\'' + value.name + '\')">'+value.name+'</a></li>';

            });
            side+='</ul></div>';
		}
		else{							// else dont have a child (parent only)
			side+='<li><a href="#" onClick="handleAction(\'' + value.link + '\',\'' + value.id + '\',\'' + value.name + '\')"><div class="'+ value.icon +'"></div><span> '+ value.name +'</a></li>';
		}
		
	});
    $("#sidebar-menu").append(side);	// append var side that have already arranged to class 
}