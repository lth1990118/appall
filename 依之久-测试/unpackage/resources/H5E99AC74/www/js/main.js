var eventS={};
window.addEventListener('show', function(event) {
	//获得事件参数
	eventS=event;
	console.log(event);
	var id = event.detail.id;
	var name = event.detail.name;
	alert(id);
	alert(name);
})