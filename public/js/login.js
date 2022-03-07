$(function(){
		let form = $('#login');
        let submit = form.find("input:eq(2)");
        let reset = form.find("input:eq(3)");
		submit.click(function(){
            $.ajax({
            type: "post",
            url:"/login",
            dataType:"json",
            data:form.serialize(),
            success: function(data) {
            	console.log(data);
                if(data.bool == 1) {
                	 alert("登录成功,自动跳转到物料剩余量查询页面");
                     window.location = "/index.html";
                }else if (data.bool == 0) {
                     alert("登录失败,密码错误");
                     window.location = "/login.html";
                }else if (data.bool == -1) {
                	 alert("登录失败，用户名错误");
                     window.location = "/login.html";
                }else {
                     alert("登录失败，服务器错误");
                     window.location = "/login.html";
                }
            }
            });     
	    });
	    reset.click(function(){
	    	window.location = "/reset.html";
   	        
	    });	
});