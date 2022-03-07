const express =require("express");
const router = express.Router();
const service = require("./service.js");



router.post("/login",service.login);

router.post("/reset",service.reset);

//从all_list表中获取统计后的物料信息
router.get("/lists",service.all_list);//主页显示数据调用

//从all_list表中根据分类获取统计后的物料信息
router.get("/lists/classify/:classify",service.getclassify);

//从all_list表中根据物料编码获取物料信息
router.get("/lists/reagentid/:reagentID",service.getID);//主页中点击到货或者使用后调用


//从whdgn_list表中根据物料编码获取所有物料使用信息
router.get("/lists/reagent/:reagentID",service.getReagentID);//主页中点击物料名称通过物料编码获取数据加载到物料查询页面或查询页面第一个form表单根据物料编码查询数据


//从whdgn_list表中根据项目编号获取所有物料使用信息
router.get("/lists/item/:id",service.getItemID);//查询页面第一个form表单通过项目编号查询数据
//从whdgn_list表中根据任务单名称获取所有物料使用信息
router.get("/lists/task/:id",service.getTaskID);//查询页面第一个form表单通过任务单名称查询数据



//添加新的物料使用信息到whdgn_list表中并在all_list表中对应减少剩余量
router.put("/lists/reagent",service.putReagentID);
//添加新的物料添加信息到whdgn_list表中并在all_list表中对应增加剩余量
router.post("/lists/reagent",service.postReagentID);

//添加新的物料到all_list表中并添加相应的信息到whdgn_list表中
router.post("/lists/addreagent",service.addReagent);

//根据物料编码删除all_list和whdgn_list中所有信息
router.post("/lists/deletereagent",service.deletereagent);

//从whdgn_list表中根据物料编码和时间区间查询使用信息
router.post("/lists/postreagentidtime",service.postreagentidtime);
//从whdgn_list表中根据项目编号和时间区间查询使用信息
router.post("/lists/postitemtime",service.postitemtime);
//从whdgn_list表中根据任务单名称和时间区间查询使用信息
router.post("/lists/posttasktime",service.posttasktime);

module.exports = router;