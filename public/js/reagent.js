$(function(){
   //初始化数据列表
   var indexdata = JSON.parse(sessionStorage.getItem("indexdata"));
   var indexhtml = template('indexTpl',{list:indexdata});
   $("#dataList").html(indexhtml);           
});

function selectname(){
      //console.log(1);
      var selectbtn1 = document.getElementById("selectcon1").value
      var valuebtn1 = document.getElementById("valuebtn1").value
          //console.log(valuebtn1);
          if(valuebtn1){
            if (selectbtn1 == "reagentID"){ selectbyreagentID(valuebtn1);}
            else if (selectbtn1 == "itemID") {selectbyitemID(valuebtn1);}
            else if (selectbtn1 == "taskId") {selectbytaskId(valuebtn1);}
            else{alert("系统出错，暂停服务")};
          }
          else{
            alert("输入信息出错，请从新输入。")
          }

};
function selecttime(){
               var selectbtn2 = document.getElementById("selectcon2").value
               var valuebtn2 = document.getElementById("valuebtn2").value
               $("#beforetime").change(function(){
               $("#beforetime").attr("value",$(this).val()); //赋值
               });
               $("#aftertime").change(function(){
               $("#aftertime").attr("value",$(this).val()); //赋值
               });
               var beforetime1 = $("#beforetime").val();
               var aftertime1 =$("#aftertime").val();
               
               var beforetime =beforetime1 + "  00:00:00";
               var aftertime = aftertime1 + "  23:59:59";  
               //console.log(beforetime);          
               if (beforetime&&aftertime&&beforetime<aftertime) {
                    if (selectbtn2 == "reagentID"){ 
                       var postreagenttime ={
                          "reagentID":valuebtn2,
                          "beforetime":beforetime,
                          "aftertime":aftertime
                        };
                        //console.log(postreagenttime);
                       selectbyreagentIdTime(postreagenttime);
                    }
                    else if (selectbtn2 == "itemID") {
                       var getitemtime ={
                          "itemID":valuebtn2,
                          "beforetime":beforetime,
                          "aftertime":aftertime
                        };
                       selectbyitemIdTime(getitemtime);
                    }
                    else if (selectbtn2 == "taskId") {
                       var gettasktime ={
                          "taskId":valuebtn2,
                          "beforetime":beforetime,
                          "aftertime":aftertime
                        };
                       selectbytaskIdTime(gettasktime);
                    }
                    else{alert("系统出错，暂停服务")};

               }else{
                   alert("输入信息出错，请从新输入。")
               };
               //console.log(selectbtn2);
               //console.log(beforetime);
               //console.log(aftertime);
};

function selectbyreagentID(reagentID){
     $.ajax({
            type: "get",
            url:"/lists/reagent/"+reagentID ,
            dataType:"json",
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
              
     });
};
function selectbyitemID(itemID){
      $.ajax({
            type: "get",
            url:"/lists/item/"+itemID,
            dataType:"json",
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
              
     });
};

function selectbytaskId(taskId){
      $.ajax({
            type: "get",
            url:"/lists/task/"+taskId ,
            dataType:"json",
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
              
     });
};
function selectbyreagentIdTime(postreagenttime){
    $.ajax({
            type: "post",
            url:"/lists/postreagentidtime",
            dataType:"json",
            data: postreagenttime,
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
    });           
};
function selectbyitemIdTime(getitemtime){
    $.ajax({
            type: "post",
            url:"/lists/postitemtime",
            dataType:"json",
            data:getitemtime,
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
    });    
};
function selectbytaskIdTime(gettasktime){
    $.ajax({
            type: "post",
            url:"/lists/posttasktime",
            dataType:"json",
            data:gettasktime,
            success: function(data) {
               //console.log(data);
               var html = template('indexTpl',{list:data});
               $("#dataList").html(html);
            }
    });   
};
