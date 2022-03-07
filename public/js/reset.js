$(function(){
        let form = $('#reset');
        let reset = form.find("input:eq(3)");
          reset.click(function(){
            $.ajax({
            type: "post",
            url:"/reset",
            dataType:"json",
            data:form.serialize(),
            success: function(data) {
               console.log(data);
                if(data.bool == 1) {
                     alert("登录成功,自动跳转到物料剩余量查询页面");
                     window.location = "/index.html";
                }else if (data.bool == 0) {
                     alert("两次密码输入不一致，请重新输入");
                     window.location = "/reset.html";
                }else if (data.bool == -1) {
                     alert("用户名不存在，请重新输入");
                     window.location = "/reset.html";
                }
            }
            });     
         });
         reset.click(function(){
          $.ajax({
                   type:"get",
                   url:"/reset.html",
             });
         });   
});