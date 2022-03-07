$(function(){
   //初始化数据列表
   function initList(){
   	  $.ajax({
   	  	type:"get",
   	  	url:"/lists",
   	  	dataType:"json",
   	  	success:function(data){
            if(data.bool == 1){
                window.location = "/login.html";
            }else{
            //console.log(data);
            // var html = template('indexTpl',{list:data});
            // $("#dataList").html(html);
            var html = template('indexTpl',{list:data});
            $("#dataList").html(html);

            $("#dataList").find("tr").each(function(index,element){
                 var td8 = $(element).find("td:eq(8)");
                 var td3 = $(element).find("td:eq(2)");
                 var reagentID = $(element).find("td:eq(1)").text();
                 td8.find("a:eq(0)").click(function() {
                        editReagent(reagentID);
                 });
                 td8.find("a:eq(1)").click(function() {
                        reduceReagent(reagentID);
                 });
                 td3.find("a:eq(0)").click(function(){
                        selectReagent(reagentID);
                 });
            });
            var addreagent = $('#addreagent');
            addreagent.click(function(){
                addreagents();
            });
            var deletereagent = $('#deletereagent');
            deletereagent.click(function(){
                deletereagents();
            });
   	  	}}
   	  });
   };
   initList();

   // if (req.cookies.username) {
   //     initList();
   // }else{
       //window.location = "/login.html";
   // }

   function addreagents(){
       var form = $("#addReagenForm");
       var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
       mark.init();
       form.find("input[type=button]").unbind("click").click(function(){
            var data = form.serialize();
            var s=$('#addclassify').val();//拿到select选中的val值
            $('#adclassify').val(s);//放到input的value中
            $.ajax({
            type: "post",
            url:"/lists/addreagent",
            dataType:"json",
            data:form.serialize(),
            //data.push({ 'classify': document.getElementById("addclassify").value });
            success: function(data) {
                console.log(data.bool);
                if(data.bool == 1) {
                     // 关闭弹窗
                     mark.close();
                     // 重新渲染数据列表
                     initList();
                }else if(data.bool == 0){
                      mark.close();
                      alert("服务器错误，请查看是否添加成功并核对剩余量。")                     
                      initList();
                } 
            }
            });
       })      
    };
   function deletereagents(){
       var form = $("#deleteReagenForm");
       var mark = new MarkBox(400,200,"删除物料",form.get(0));
       mark.init();
       form.find("input[type=button]").unbind("click").click(function(){
            $.ajax({
            type: "post",
            url:"/lists/deletereagent",
            dataType:"json",
            data:form.serialize(),
            success: function(data) {
                if(data.bool == 1) {
                     // 关闭弹窗
                     mark.close();
                     // 重新渲染数据列表
                     initList();
                }else if (data.bool == 0) {
                    mark.close();
                    alert("删除错误，请重新输入");
                    initList();
                } 
            }
            });
       })      
    };

   function editReagent(reagentID) {
        var form = $("#editReagenForm");
        //console.log(reagentID);
        // 根据id查询最新的数据
        $.ajax({
            type: "get",
            url:"/lists/reagentid/"+reagentID ,
            dataType:"json",
            success: function(data) {
            	//console.log(data);
                // 初始化弹窗
                var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
                mark.init();
                // 填充表单数据
                form.find("input[name=beforenum]").val(data.剩余量)
                form.find("input[name=reagentID]").val(data.物料编码);
                form.find("input[name=reagentName]").val(data.物料名称);
                form.find("input[name=itemID]").val("");
                form.find("input[name=taskId]").val("");
                form.find("input[name=afternum]").val("");
                // 对表单提交按钮重新绑定单击事件
                form.find("input[type=button]").unbind("click").click(function(){
                    // 编辑完成数据后重新提交表单
                    $.ajax({
                        type: "post",
                        url: "/lists/reagent",
                        dataType:"json",
                        async: false,
                        data: form.serialize(),
                        success: function(data) {
                            if(data.bool == 1) {
                                // 关闭弹窗
                                 mark.close();
                                 // 重新渲染数据列表
                                 initList();
                            } else if (data.bool == 0) {
                                 mark.close();
                                 alert("输入有错，请重新输入");
                                 // 重新渲染数据列表
                                 initList();
                            }
                        } 
                    });
                });
            }
        });
   };
   function reduceReagent(reagentID) {
        var form = $("#editReagenForm");
        //console.log(reagentID);
        // 根据id查询最新的数据
        $.ajax({
            type: "get",
            url:"/lists/reagentid/"+reagentID ,
            dataType:"json",
            success: function(data) {
            	//console.log(data);
                // 初始化弹窗
                var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
                mark.init();
                // 填充表单数据
                form.find("input[name=beforenum]").val(data.剩余量)
                form.find("input[name=reagentID]").val(data.物料编码);
                form.find("input[name=reagentName]").val(data.物料名称);
                form.find("input[name=itemID]").val("");
                form.find("input[name=taskId]").val("");
                form.find("input[name=afternum]").val("");
                // 对表单提交按钮重新绑定单击事件
                form.find("input[type=button]").unbind("click").click(function(){
                    // 编辑完成数据后重新提交表单
                    $.ajax({
                        type: "put",
                        url: "/lists/reagent/",
                        dataType:"json",
                        async: false,
                        data: form.serialize(),
                        success: function(data) {
                            if(data.bool == 1) {
                                // 关闭弹窗
                                 mark.close();
                                 // 重新渲染数据列表
                                 initList();
                            }else if (data.bool == 0) {
                                 mark.close();
                                 alert("输入有错，请重新输入");
                                 // 重新渲染数据列表
                                 initList();
                            } 
                        } 
                    });
                });
            }
        });
   };
   function selectReagent(reagentID){
   	   $.ajax({
   	   	 type: "get",
         url:"/lists/reagent/"+reagentID ,
         dataType:"json",
         success: function(data){
         	//console.log(data);
            if(data.bool == 1){
                window.location = "/login.html";
            }else{
             	sessionStorage.setItem("indexdata",JSON.stringify(data));
            	window.location.href="http://localhost:3000/reagent.html"
            }
         }
   	   });

   };
});

function selectclassify(){
     var classify = document.getElementById("classify").value
     $.ajax({
            type: "get",
            url:"/lists/classify/"+classify ,
            dataType:"json",
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            
              
     
               $("#dataList").find("tr").each(function(index,element){
                 var td8 = $(element).find("td:eq(8)");
                 var td3 = $(element).find("td:eq(2)");
                 var reagentID = $(element).find("td:eq(1)").text();
                 td8.find("a:eq(0)").click(function() {
                        editReagent(reagentID);
                 });
                 td8.find("a:eq(1)").click(function() {
                        reduceReagent(reagentID);
                 });
                 td3.find("a:eq(0)").click(function(){
                        selectReagent(reagentID);
                 });
               });
               var addreagent = $('#addreagent');
               addreagent.click(function(){
                    addreagents();
               });
               var deletereagent = $('#deletereagent');
               deletereagent.click(function(){
                  deletereagents();
               });
            }
     });
   function addreagents(){
        var form = $("#addReagenForm");
        var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
        mark.init();
        form.find("input[type=button]").unbind("click").click(function(){
            var data = form.serialize();
            var s=$('#addclassify').val();//拿到select选中的val值
            $('#adclassify').val(s);//放到input的value中
            $.ajax({
            type: "post",
            url:"/lists/addreagent",
            dataType:"json",
            data:form.serialize(),
            //data.push({ 'classify': document.getElementById("addclassify").value });
            success: function(data) {
                console.log(data.bool);
                if(data.bool == 1) {
                     // 关闭弹窗
                     mark.close();
                     // 重新渲染数据列表
                     selectclassify();
                }else if(data.bool == 0){
                      mark.close();
                      alert("服务器错误，请查看是否添加成功并核对剩余量。")                     
                      selectclassify();
                } 
            }
            });
        })      
    };
   function deletereagents(){
       var form = $("#deleteReagenForm");
       var mark = new MarkBox(400,200,"删除物料",form.get(0));
       mark.init();
       form.find("input[type=button]").unbind("click").click(function(){
            $.ajax({
            type: "post",
            url:"/lists/deletereagent",
            dataType:"json",
            data:form.serialize(),
            success: function(data) {
                if(data.bool == 1) {
                     // 关闭弹窗
                     mark.close();
                     // 重新渲染数据列表
                     selectclassify();
                }else if (data.bool == 0) {
                    mark.close();
                    alert("删除错误，请重新输入");
                    selectclassify();
                } 
            }
            });
       })      
    };

   function editReagent(reagentID) {
        var form = $("#editReagenForm");
        //console.log(reagentID);
        // 根据id查询最新的数据
        $.ajax({
            type: "get",
            url:"/lists/reagentid/"+reagentID ,
            dataType:"json",
            success: function(data) {
                //console.log(data);
                // 初始化弹窗
                var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
                mark.init();
                // 填充表单数据
                form.find("input[name=beforenum]").val(data.剩余量)
                form.find("input[name=reagentID]").val(data.物料编码);
                form.find("input[name=reagentName]").val(data.物料名称);
                form.find("input[name=itemID]").val("");
                form.find("input[name=taskId]").val("");
                form.find("input[name=afternum]").val("");
                // 对表单提交按钮重新绑定单击事件
                form.find("input[type=button]").unbind("click").click(function(){
                    // 编辑完成数据后重新提交表单
                    $.ajax({
                        type: "post",
                        url: "/lists/reagent",
                        dataType:"json",
                        async: false,
                        data: form.serialize(),
                        success: function(data) {
                            if(data.bool == 1) {
                                // 关闭弹窗
                                 mark.close();
                                 // 重新渲染数据列表
                                 selectclassify();
                            } else if (data.bool == 0) {
                                 mark.close();
                                 alert("输入有错，请重新输入");
                                 // 重新渲染数据列表
                                 selectclassify();
                            }
                        } 
                    });
                });
            }
        });
   };
   function reduceReagent(reagentID) {
        var form = $("#editReagenForm");
        //console.log(reagentID);
        // 根据id查询最新的数据
        $.ajax({
            type: "get",
            url:"/lists/reagentid/"+reagentID ,
            dataType:"json",
            success: function(data) {
                //console.log(data);
                // 初始化弹窗
                var mark = new MarkBox(600,400,"新到物料增加",form.get(0));
                mark.init();
                // 填充表单数据
                form.find("input[name=beforenum]").val(data.剩余量)
                form.find("input[name=reagentID]").val(data.物料编码);
                form.find("input[name=reagentName]").val(data.物料名称);
                form.find("input[name=itemID]").val("");
                form.find("input[name=taskId]").val("");
                form.find("input[name=afternum]").val("");
                // 对表单提交按钮重新绑定单击事件
                form.find("input[type=button]").unbind("click").click(function(){
                    // 编辑完成数据后重新提交表单
                    $.ajax({
                        type: "put",
                        url: "/lists/reagent/",
                        dataType:"json",
                        async: false,
                        data: form.serialize(),
                        success: function(data) {
                            if(data.bool == 1) {
                                // 关闭弹窗
                                 mark.close();
                                 // 重新渲染数据列表
                                 selectclassify();
                            }else if (data.bool == 0) {
                                 mark.close();
                                 alert("输入有错，请重新输入");
                                 // 重新渲染数据列表
                                 selectclassify();
                            } 
                        } 
                    });
                });
            }
        });
   };
   function selectReagent(reagentID){
       $.ajax({
         type: "get",
         url:"/lists/reagent/"+reagentID ,
         dataType:"json",
         success: function(data){
            //console.log(data);
            if(data.bool == 1){
                window.location = "/login.html";
            }else{
                sessionStorage.setItem("indexdata",JSON.stringify(data));
                window.location.href="http://localhost:3000/reagent.html"
            }
         }
       });

   };
};





