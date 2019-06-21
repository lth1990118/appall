

var tempHtml = {
	listTab: function(list) {
		var result = "";
		for (var i = 0; i < list.length; i++) {
			if (i == 0) {
				result = '<a class="mui-control-item mui-active" href="item-tab-' + (i + 1) + '">' + list[i] + '</a>';
			} else {
				result += '<a class="mui-control-item" href="item-tab-' + (i + 1) + '">' + list[i] + '</a>';
			}
			//console.log(result);		
		}
		//console.log(list);
		//console.log(result);
		return result;
	},
	formBody: function(list) {
		var result = "";
		for (var i = 0; i < list.length; i++) {
			var disable =list[i].disable||false;
			if(list[i].disable){
				continue;
			}
			switch (list[i].type) {
				case "string":
				case "number":
					result += '<li class="mui-table-view-cell" style="padding: 2px;">' +
						'	<div class="mui-input-row">' +
						'		<label>' + list[i].name + '：</label>' +
						'		<input id="' + list[i].id + '" name="' + list[i].id + '" type="text" placeholder="' + list[i].name + '"'+(list[i].readonly||false?' readonly':'')+'>' +
						'	</div>' +
						'</li>';
					break;
				case "boolean":
					result += '<li class="mui-table-view-cell" style="padding: 2px;">' +
						'	<div class="mui-input-row mui-checkbox mui-left">' +
						'		<label>' + list[i].name + '</label>' +
						'		<input id="' + list[i].id + '" name="' + list[i].id + '" value="' + list[i].id + '" type="checkbox">' +
						'	</div>' +
						'</li>';
					break;
				case "password":
					result += '<li class="mui-table-view-cell" style="padding: 2px;">' +
						'	<div class="mui-input-row">' +
						'		<label>' + list[i].name + '：</label>' +
						'		<input id="' + list[i].id + '" name="' + list[i].id + '" type="password" placeholder="' + list[i].name + '">' +
						'	</div>' +
						'</li>';
					break;
			}
		}
		return result;
	},
	form: function(list) {
		var result = tempHtml.formBody(list);
		result += '<li style="margin-top: 10px;">' +
			' <div class="mui-row">' +
			' 	<div class="mui-col-xs-6" style="padding:5px">' +
			'			<button id="cancel" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
			'			style="padding: 10px;font-weight: bolder;font-size: 16px;">返回修改</button>' +
			' 	</div>' +
			' 	<div class="mui-col-xs-6" style="padding:5px">' +
			'			<button id="submit" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
			'			style="padding: 10px;font-weight: bolder;font-size: 16px;">确认</button>' +
			' 	</div>' +
			' </div>' +
			'</li>';
		return result;
	},
	formAdd: function(list) {
		var result = tempHtml.formBody(list);
		result += '<li style="margin-top: 10px;">' +
			'	<button id="submit" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
			'	style="padding: 10px;font-weight: bolder;font-size: 16px;">提交</button>' +
			'</li>';
		return result;
	},
	saleList: function(isLoadTitle, title, data) {
		var listElement = [];
		if (!isLoadTitle) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			var div = document.createElement('div');
			div.className = 'mui-row';			
			var titleHtml="";
			for (var i = 0; i < title.length; i++) {
				titleHtml+='	<div class="mui-col-xs-'+title[i].col+'">' +
							'		<b>'+title[i].name+'</b>' +
							'	</div>';
			}
			div.innerHTML=titleHtml;
			li.appendChild(div);
			// 			li.innerHTML = '<div class="mui-row">' +
			// 				'	<div class="mui-col-xs-4">' +
			// 				'		<b>日期</b>' +
			// 				'	</div>' +
			// 				'	<div class="mui-col-xs-4">' +
			// 				'		<b>代理</b>' +
			// 				'	</div>' +
			// 				'	<div class="mui-col-xs-4">' +
			// 				'		<b>数量</b>' +
			// 				'	</div>' +
			// 				'</div>';
			listElement.push(li);
		}
		var bodyHtml=tempHtml.saleListBody(title,data);
		for (var i = 0; i < bodyHtml.length; i++) {
			listElement.push(bodyHtml[i]); 
		}		
		//tempHtml.saleListBody(title,data);
		//console.log(listElement);
		return listElement;
	},
	saleListBody:function(title,data){		
		var listElement = [];
		 for(var i=0;i<data.length;i++){			 
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			var div = document.createElement('div');
			div.className = 'mui-row';			
			var titleHtml="";
			for (var j = 0; j < title.length; j++) {
				titleHtml+='	<div class="mui-col-xs-'+title[j].col+'">' +
							'		<span>'+data[i][title[j].pro]+'</span>' +
							'	</div>';
				
			}
			div.innerHTML=titleHtml;
			li.appendChild(div);
			listElement.push(li);
		 }
		 //console.log(listElement);
		 return listElement;
	}
}
var tempJson = {
	
	saleTab_CN: ["添加销售",'代理升级', "销售记录"],
	agentTab_CN: ["添加代理", "代理记录"],
	bonusTab_CN: ["我要提现", "提现记录", "收入记录"],
	saleFormAdd: [{
			id: "salerID",
			name: "消费代理ID",
			type: "string"
		},
		{
			id: "saleCount",
			name: "销售套盒数",
			type: "number"
		},
		{
			id: "isStepIn",
			name: "升级为三级代理",
			type: "boolean",
			disable:false
		}
	],
	saleForm: [{
			id: "salerID",
			name: "消费代理ID",
			type: "string",
			readonly:true
		},
		{
			id: "salerName",
			name: "消费代理姓名",
			type: "string",
			readonly:true
		},
		{
			id: "salerLevel",
			name: "消费代理级别",
			type: "string",
			readonly:true
		},
		{
			id: "price",
			name: "每盒单价",
			type: "number",
			readonly:true
		},
		{
			id: "saleCount",
			name: "销售套盒数",
			type: "number",
			readonly:true
		},
		{
			id: "totalPrice",
			name: "销售总价",
			type: "number",
			readonly:true
		},
		{
			id: "isStepIn",
			name: "升级为三级代理",
			type: "boolean",
			readonly:true,
			disable:false
		}
	],
	saleListtitle: [{
			pro: "date",
			name: "日期",
			col: 4
		},
		{
			pro: "agent",
			name: "代理",
			col: 5
		},
		{
			pro: "num",
			name: "数量",
			col: 3
		}
	],
	agentFormAdd:[
// 		{
// 			id: "tjrID",
// 			name: "推荐人ID",
// 			type: "string"
// 		},
		{
			id: "loginName",
			name: "登录名",
			type: "string"
		},
		{
			id: "loginPassword",
			name: "登录密码",
			type: "password"
		},
		{
			id: "loginConfirmPassword",
			name: "确认密码",
			type: "password"
		}
// 		,
// 		{
// 			id: "saleCount",
// 			name: "销售套盒数",
// 			type: "number"
// 		},
// 		{
// 			id: "isStepIn",
// 			name: "升级为三级代理",
// 			type: "boolean"
// 		}
	],
	agentForm:[
			{
				id: "tjrID",
				name: "推荐人ID",
				type: "string"
			},
			{
				id: "tjrName",
				name: "推荐人姓名",
				type: "string"
			},
			{
				id: "loginName",
				name: "登录名",
				type: "string"
			},
			{
				id: "price",
				name: "每盒单价",
				type: "number"
			},
			{
				id: "saleCount",
				name: "销售套盒数",
				type: "number"
			},
			{
				id: "totalPrice",
				name: "销售总价",
				type: "number"
			},
			{
				id: "isStepIn",
				name: "升级为三级代理",
				type: "boolean"
			}
		]
	,agentListtitle: [{
			pro: "date",
			name: "日期",
			col: 4
		},
		{
			pro: "agent",
			name: "代理",
			col: 4
		},
		{
			pro: "level",
			name: "级别",
			col: 4
		}
	]
	,bonusFormAdd:[{
			id: "money",
			name: "提现金额",
			type: "number"
		},
		{
			id: "password",
			name: "提现密码",
			type: "password"
		},		
		{
			id: "payUserID",
			name: "支付代理商ID",
			type: "string"
		},
		{
			id: "payUserCode",
			name: "代理商验证码",
			type: "string"
		}
	]
	,bonusCashListTitle:[{
			pro: "applyDate",
			name: "申请日期",
			col: 3
		},
		{
			pro: "qty",
			name: "金额",
			col: 3
		},
		{
			pro: "payUser",
			name: "支付人",
			col: 3
		},
		{
			pro: "finishDate",
			name: "完成日期",
			col: 3
		}
	],
	bonusIncomeListTitle:[{
			pro: "date",
			name: "日期",
			col: 3
		},
		{
			pro: "Awards",
			name: "奖项",
			col: 4
		},
		{
			pro: "qty",
			name: "金额",
			col: 3
		},
		{
			pro: "effective",
			name: "有效",
			col: 2
		}
	]
	,purchaseListtitle: [{
			pro: "date",
			name: "日期",
			col: 4
		},
		{
			pro: "agent",
			name: "代理",
			col: 5
		},
		{
			pro: "num",
			name: "数量",
			col: 3
		}
	],
	myTeamListtitle: [{
			pro: "date",
			name: "日期",
			col: 4
		},
		{
			pro: "agent",
			name: "代理",
			col: 5
		},
		{
			pro: "level",
			name: "级别",
			col: 3
		}
	]
	,infoFormAdd:[{
			id: "id",
			name: "我的ID",
			type: "string",
			readonly:true
		},
		{
			id: "userName",
			name: "我的登录名",
			type: "string",
			readonly:true
		},		
		{
			id: "level",
			name: "我的级别",
			type: "string",
			readonly:true
		},
		{
			id: "name",
			name: "我的姓名",
			type: "string"
		},
		{
			id: "telephone",
			name: "我的手机",
			type: "string"
		}
	]
	,loginPasswordFormAdd:[{
			id: "oldPassword",
			name: "原始密码",
			type: "password",
		},
		{
			id: "newPassword",
			name: "新密码",
			type: "password"
		},		
		{
			id: "confirmPassword",
			name: "确认密码",
			type: "password"
		}
	]
	,cashPasswordFormAdd:[{
			id: "oldPassword",
			name: "提现密码",
			type: "password",
		},
		{
			id: "newPassword",
			name: "新密码",
			type: "password"
		},		
		{
			id: "confirmPassword",
			name: "确认密码",
			type: "password"
		}
	]	
	,menu:{
		sale_CN:"我的销售",
		agent_CN:"我的代理",		
		bonus_CN:"我的钱包",
		purchase_CN:"我的采购",
		loginPassword_CN:"登录密码",
		cashPassword_CN:"提现密码",
		info_CN:"我的信息",
		exit_CN:"退出系统",
		myTeam_CN:"我的团队"
	},
	system:"FR",
	msgAgent:"succès！",	
	msgSaleLevel:"succès！",
	msgSale:"succès！",
	msgNoData:"Il n’y a plus de données pertinentes！",
	msgBonus:"succès！",
	msgInfoUp:"succès！",
	msgLoginPasswordUp:"succès",
	msgCashPasswordUp:"succès"
}

testData = {
	testSaleData : [
		{
			date: '2019-04-19',
			agent: '代理人test1',
			num: 10
		},
		{
			date: '2019-04-19',
			agent: '代理人test2',
			num: 10
		},
		{
			date: '2019-04-19',
			agent: '代理人test3',
			num: 10
		},
		{
			date: '2019-04-19',
			agent: '代理人test4',
			num: 10
		},
		{
			date: '2019-04-19',
			agent: '代理人test5',
			num: 10
		},
		{
			date: '2019-04-19',
			agent: '代理人test6',
			num: 10
		}
	],
	testAgentData:[
		{
			date: '2019-04-19',
			agent: '代理人1',
			level: 1
		},
		{
			date: '2019-04-19',
			agent: '代理人2',
			level: 2
		},
		{
			date: '2019-04-19',
			agent: '代理人3',
			level: 3
		},
		{
			date: '2019-04-19',
			agent: '代理人4',
			level: 4
		},
		{
			date: '2019-04-19',
			agent: '代理人5',
			level: 5
		},
		{
			date: '2019-04-19',
			agent: '代理人6',
			level: 6
		}
	]
	,testBonusCashData:[
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人1",
			finishDate:'2019-04-20'
		},
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人2",
			finishDate:'2019-04-20'
		},
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人3",
			finishDate:'2019-04-20'
		},
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人4",
			finishDate:'2019-04-20'
		},
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人5",
			finishDate:'2019-04-20'
		},
		{
			applyDate: '2019-04-20',
			qty: '100',
			payUser: "支付人6",
			finishDate:'2019-04-20'
		}
	]
	,testBonusIncomeData:[
			{
				date: '2019-04-20',
				Awards: '直推奖',
				qty: "500",
				effective:'是'
			},
			{
				date: '2019-04-20',
				Awards: '直推奖',
				qty: "5001",
				effective:'否'
			},
			{
				date: '2019-04-20',
				Awards: '10005转入',
				qty: "5001",
				effective:'是'
			},
			{
				date: '2019-04-20',
				Awards: '直推奖',
				qty: "5001",
				effective:'是'
			}
		]
	,testPurchaseData:[
		{
			date: '2019-04-19',
			agent: '采购代理人1',
			num: 1
		},
		{
			date: '2019-04-19',
			agent: '采购代理人2',
			num: 2
		},
		{
			date: '2019-04-19',
			agent: '采购代理人3',
			num: 3
		},
		{
			date: '2019-04-19',
			agent: '采购代理人4',
			num: 4
		},
		{
			date: '2019-04-19',
			agent: '采购代理人5',
			num: 5
		},
		{
			date: '2019-04-19',
			agent: '采购代理人6',
			num: 6
		}
	]
}

var addSale = '<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售代理ID：</label>' +
	'		<input id="salerID" type="text" placeholder="销售代理ID">' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售套合数：</label>' +
	'		<input id="saleCount" type="text" placeholder="销售套合数">' +
	'	</div>' +
	'</li>' +
	'<li style="margin-top: 10px;">' +
	'	<button id="submit" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
	'	style="padding: 10px;font-weight: bolder;font-size: 16px;">提交</button>' +
	'</li>';
var salePage = '<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售代理ID：</label>' +
	'		<input id="salerID" type="text" placeholder="销售代理ID" readonly >' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售代理姓名：</label>' +
	'		<input id="salerName" type="text" placeholder="销售代理姓名" readonly >' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售代理级别：</label>' +
	'		<input id="salerLevel" type="text" placeholder="销售代理级别" readonly >' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>每盒单价：</label>' +
	'		<input id="price" type="text" placeholder="每盒单价" readonly >' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售套合数：</label>' +
	'		<input id="saleCount" type="text" placeholder="销售套合数" readonly >' +
	'	</div>' +
	'</li>' +
	'<li class="mui-table-view-cell" style="padding: 2px;">' +
	'	<div class="mui-input-row">' +
	'		<label>销售总价：</label>' +
	'		<input id="totalPrice" type="text" placeholder="销售总价" readonly >' +
	'	</div>' +
	'</li>' +
	'<li style="margin-top: 10px;">' +
	' <div class="mui-row">' +
	' 	<div class="mui-col-xs-6" style="padding:5px">' +
	'			<button id="cancel" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
	'			style="padding: 10px;font-weight: bolder;font-size: 16px;">返回修改</button>' +
	' 	</div>' +
	' 	<div class="mui-col-xs-6" style="padding:5px">' +
	'			<button id="makesure" type="button" class="mui-btn mui-btn-blue mui-btn-block mui-icon" ' +
	'			style="padding: 10px;font-weight: bolder;font-size: 16px;">确认销售</button>' +
	' 	</div>' +
	' </div>' +
	'</li>';
