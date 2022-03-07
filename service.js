const db = require("./mysql.js");

exports.login = (req,res)=>{
     let info = req.body;
     //console.log(info);
     let sql = "select * from user_list where name = ?";
     let data = [info.username];
     //console.log(data);
     db.base(sql,data,(result)=>{
          //console.log(result.length);   
          if (result.length == 0) {
             res.json({bool:-1});//查询不到该用户名
          } else if (result[0].password == info.password){
             res.cookie("username",info.username,{expires:0});
             res.json({bool:1});
          } else {
             res.json({bool:0});
          }   
     })
};

exports.reset = (req,res)=>{
     let info = req.body;
     if (info.newpassword1 == info.newpassword2) {
        let sql = "update user_list set password = ? where name = ? ";
        let data = [info.newpassword1,info.username];
        db.base(sql,data,(result)=>{
             if(result.affectedRows == 1){
                 res.cookie("username",info.username,{expires:0});
                 res.json({bool:1});
             } else {
                 res.json({bool:-1});
             }         
        });
     }else{
         res.json({bool:0});
     }
};
//从all_list表中获取统计后的物料信息
exports.all_list = (req,res)=>{
    //console.log(req.cookies.username);
    if(req.cookies.username != undefined){
    let sql = "select * from all_list";
    let data = null;
    db.base(sql,data,(result)=>{
          res.json(result);
          //console.log(result);
    })}else{
          res.json({bool:1});
    }
};

//从all_list表中根据分类获取统计后的物料信息
exports.getclassify = (req,res)=>{
    if(req.cookies.username != undefined){
         let classify = req.params.classify;
         let sql = "select * from all_list where 分类 = ?";
         let data = classify;
         db.base(sql,data,(result)=>{
            res.json(result);
            //console.log(result);
         })
    }else{
       res.json({bool:1});
    }
};

//从all_list表中根据物料编码获取物料信息
exports.getID = (req,res)=>{
    let reagentID = req.params.reagentID;
    //console.log(reagentID);
    let sql = "select * from all_list where 物料编码 = ?";
    data = [reagentID];
    //console.log(data);
    db.base(sql,data,(result)=>{
    	 //console.log(result[0]);
         res.json(result[0]); 
    })

};

//从whdgn_list表中根据物料编码获取所有物料使用信息
exports.getReagentID = (req,res)=>{
    if(req.cookies.username !=undefined){
        let reagentID = req.params.reagentID;
        let sql = "select * from whdgn_list where 物料编码 = ?";
        data = [reagentID];
        //console.log(reagentID);
        db.base(sql,data,(result)=>{
             res.json(result); 
        });
    }
    else{
         res.json({bool:1});
    }
};

//从whdgn_list表中根据项目编号获取所有物料使用信息
exports.getItemID = (req,res)=>{
    let id = req.params.id;
    let sql = "select * from whdgn_list where 项目编号 = ?";
    data = [id];
    db.base(sql,data,(result)=>{
         res.json(result); 
    })
};

//从whdgn_list表中根据任务单名称获取所有物料使用信息
exports.getTaskID = (req,res)=>{
    let id = req.params.id;
    let sql = "select * from whdgn_list where 任务单名称 = ?";
    data = [id];
    db.base(sql,data,(result)=>{
         res.json(result); 
    })
};

//添加新的物料使用信息到whdgn_list表中并在all_list表中对应减少剩余量
exports.putReagentID = (req,res)=>{
    //将数据更新到whdgn_list表中
    let info = req.body;
    if(info.afternum){
       //console.log(info);
       let sql1 = "insert into whdgn_list (物料编码,物料名称,项目编号,任务单名称,使用量或新增量,操作人) values (?,?,?,?,?,?)"
       let data1 = [info.reagentID,info.reagentName,info.itemID,info.taskId,info.afternum,req.cookies.username];
       db.base(sql1,data1,(result)=>{
            if(result.affectedRows != 1){
               res.json({bool:0});
            }else {
               //console.log("whdgn_list表插入成功");
            }
       });
       //修改剩余量并更新到all_list表中
       let sql2 = "update all_list set 剩余量 = ? where 物料编码 = ?";
       let num = parseFloat(info.beforenum) - parseFloat(info.afternum);
           //console.log(num);
       let data2 = [num,info.reagentID];
       db.base(sql2,data2,(result)=>{
             //console.log(result);
             if(result.affectedRows == 1){
                res.json({bool:1});
             } else {
                res.json({bool:0});
             }
       });
    }else{
        res.json({bool:0});
    }
};
//添加新的物料添加信息到whdgn_list表中并在all_list表中对应增加剩余量
exports.postReagentID = (req,res)=>{
    let info = req.body;
    //console.log(info);
    //将数据更新到whdgn_list表中
    if(info.afternum){
       let sql1 = "insert into whdgn_list (物料编码,物料名称,项目编号,任务单名称,使用量或新增量,操作人) values (?,?,?,?,?,?)"
       let data1 = [info.reagentID,info.reagentName,info.itemID,info.taskId,info.afternum,req.cookies.username];
       db.base(sql1,data1,(result)=>{
            if(result.affectedRows != 1){
                res.json({bool:0});
            }else {
            //console.log("whdgn_list表插入成功");
            }
       });
       //修改剩余量并更新到all_list表中
       let sql2 = "update all_list set 剩余量 = ? where 物料编码 = ?";
       let num = parseFloat(info.afternum) + parseFloat(info.beforenum);
           //console.log(num);
       let data2 = [num,info.reagentID];
       db.base(sql2,data2,(result)=>{
          //console.log(result);
          if(result.affectedRows == 1){
          	res.json({bool:1});
          } else {
          	res.json({bool:0});
          }
       });
    }else{
        res.json({bool:0});
    };
};
//添加新的物料到all_list表中并添加相应的信息到whdgn_list表中
exports.addReagent = (req,res)=>{
    let info = req.body;
    //console.log(info);
    //将数据更新到whdgn_list表中
    if(info.addnum){
       let sql1 = "insert into whdgn_list (物料编码,物料名称,项目编号,任务单名称,使用量或新增量,操作人) values (?,?,?,?,?,?)"
       let data1 = [info.addreagentID,info.addreagentName,info.additemID,info.addtaskId,info.addnum,req.cookies.username];
       db.base(sql1,data1,(result)=>{
       });
       //将数据更新到all_list表中
       let sql2 = "insert into all_list (物料编码,物料名称,剩余量,品牌,规格,分类) values (?,?,?,?,?,?)"
       let data2 = [info.addreagentID,info.addreagentName,info.addnum,info.brand,info.specs,info.classify];
       db.base(sql2,data2,(result)=>{
            if(result.affectedRows == 1){
         	   res.json({bool:1});
            } else {
         	   res.json({bool:0});
            }
       });
   }else{
       res.json({bool:0});
   };
};
//根据物料编码删除all_list和whdgn_list表中所有相关数据
exports.deletereagent = (req,res)=>{
    let info = req.body;
    //console.log(info.deletereagentID);
    let sql1 = "delete from whdgn_list where 物料编码 = ?";
    let data1 = info.deletereagentID;
    db.base(sql1,data1,(result)=>{
    });
    let sql2 = "delete from all_list where 物料编码 = ?";
    let data2 = info.deletereagentID;
    db.base(sql2,data2,(result)=>{
        //console.log(result);
        if(result.affectedRows == 1){
            res.json({bool:1});
        } else {
            res.json({bool:0});
        };
    });
};

//从whdgn_list表中根据物料编码和时间区间查询使用信息
exports.postreagentidtime = (req,res)=>{
    let info = req.body;
    let beforetime = info.beforetime;    
    let aftertime = info.aftertime;
    //console.log(info.reagentID,info.beforetime,info.aftertime);
    //console.log(info.reagentID,beforetime,aftertime);
    //console.log(typeof(info.beforetime));
    //console.log(beforetime);
    let sql = "select * from whdgn_list where unix_timestamp(日期) >= unix_timestamp(?) and unix_timestamp(日期) <= unix_timestamp(?) and 物料编码 = ?;"
    let data = [beforetime,aftertime,info.reagentID];
    db.base(sql,data,(result)=>{
         //console.log(result);
         res.json(result);
    });

};
//从whdgn_list表中根据项目编号和时间区间查询使用信息
exports.postitemtime = (req,res)=>{
    let info = req.body;
    let beforetime = info.beforetime;    
    let aftertime = info.aftertime;
    let sql = "select * from whdgn_list where unix_timestamp(日期) >= unix_timestamp(?) and unix_timestamp(日期) <= unix_timestamp(?) and 项目编号 = ?;"
    let data = [beforetime,aftertime,info.itemID];
    db.base(sql,data,(result)=>{
         //console.log(result);
         res.json(result);
    });

};
//从whdgn_list表中根据任务单名称和时间区间查询使用信息
exports.posttasktime = (req,res)=>{
    let info = req.body;
    let beforetime = info.beforetime;    
    let aftertime = info.aftertime;
    let sql = "select * from whdgn_list where unix_timestamp(日期) >= unix_timestamp(?) and unix_timestamp(日期) <= unix_timestamp(?) and 任务单名称 = ?;"
    let data = [beforetime,aftertime,info.taskId];
    db.base(sql,data,(result)=>{
         //console.log(result);
         res.json(result);
    });

};