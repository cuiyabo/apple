var app=angular.module("reminder",[]);


//左面input
app.directive("myUl",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:'<div class="xiaxia" style="overflow:auto"><div ng-transclude></div></div>',
	    link:function($scope,el){
	    	$(el).on("click",".tx",function(){
	    		$(el).find(".tx").removeClass("active");
	    		$(this).addClass("active");
	    		var self=this;
	    		$scope.$apply(function(){
	    			$scope.cu=$(self).index();
	    		})
	    	})
	    	$(document).on("keyup",function(e){
	    		if(e.keyCode===8){	    			
	    			var index=$(".active").index();
	    			if(index!==-1){
	    				$scope.$apply(function(){
	    					$scope.lists.splice(index,1);
	    		  			$scope.savelocal()
	    				})	 	
	    			}
	    			   			
	    		}
	    	})
	    }
	}
}])


//右面选项
app.directive("myXx",[function(){
	return{
		restrict:"A",
		replace:true,
		transclude:true,
		template:'<div class="btn {{lists[cu].theme}}"><div ng-transclude></div></div>',
		link:function($scope,ee){
//			阻止冒泡
			$(document).on("keyup",":input",false)
			$('.xiaxia').on('click',false)
			$('.btn').on("click",function(){
				$('.btn').find(".tan").removeClass("active");
				$(this).find(".tan").toggle();
				return false;
			});
			$('.btn').find(".tan").on("click",false);
			$(document).on("click",function(){
				$('.btn').find(".tan").hide();
			})
		}
	}
}])




//添加
app.controller("mainCtrl",["$scope",function($scope){
	$scope.lists=[
//	    {id:1001,name:"买书列表",theme:"red"},
//	    {id:1002,name:"请客列表",theme:"yellow"},
//	    {id:1003,name:"学习列表",theme:"blue"}
	];
	$scope.colors=["red","yellow","blue","green","purple","brown"]
	$scope.cu=0;
	
	
	
	
	
	if(localStorage.r){
		$scope.lists=JSON.parse(localStorage.r);
	}else{
		$scope.lists=[];
	}
	
	
	
	$scope.savelocal=function(){
		localStorage.r=JSON.stringify($scope.lists)
	}

	
	function maxId(){		
		var max=-Infinity;
		for(var i=0;i<$scope.lists.length;i++){
			var v=$scope.lists[i];
			if(v.id>max){
				max=v.id;
			}
		}		
		return (max===-Infinity)?1000:max;
	}
	maxId();
	

	$scope.addlist=function(){
		var len=$scope.lists.length;		
		var index=len%6;		
		var v={
			id:maxId()+1,
			name:"新列表"+(len+1),
			theme:$scope.colors[index],
			todos:[]
		};
		$scope.lists.push(v);
	}

//	计算已完成的数量	
	$scope.count=function(){
		var r=0;		
			$scope.lists[$scope.cu].todos.forEach(function (v,i){
			if(v.state===1){
				r++
			}	
		})
		return r 
	}
//	清除已完成
	$scope.clear=function(){
//		alert(1)
		var newarr =[];
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state===0){
				newarr.push(v);
			}
		});
		$scope.lists[$scope.cu].todos=newarr;
	}
//	选项里边的取消与完成函数
	$scope.cancel=function(){
		var hidden=$(".tan");
		hidden.hide();
	}
	
//	选项里边的删除函数
	$scope.del=function(){
		$scope.lists.splice($scope.cu,1)
	}
		
}])
