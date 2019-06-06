window.api = {
    project: {
        addProject: function (e, cb) {
            util.request2("/project/add", e, cb);
        },
        updateProject: function (e, cb) {
            util.request2("/project/update", e, cb);
        },
        deleteProject: function (e, cb) {
            util.request("project/delete", e, cb);
        },
        getList: function (e, cb) {
            util.request2("/project/getList", e, cb);
        },
        startProject: function (e, cb) {
            util.request("project/startFlow", e, cb);
        },
        getPerson: function (e, cb) {
            util.request("project/getPerson", e, cb);
        },

    },
//api.project.getList({},function(msg){
// 
// });
    machine: {
        adMachine: function (e, cb) {
            util.request2("/machine/add", e, cb);
        },
        updateMachine: function (e, cb) {
            util.request2("/machine/update", e, cb);
        },
        deleteMachine: function (e, cb) {
            util.request("/machine/delete", e, cb);
        },
        getListByProject: function (e, cb) {
            util.request("/machine/getMachineByProjectId", e, cb);
        },
    },
    flow: {
        getMyFlow: function (e, cb) {
            util.request("flow/getMyFlow", e, cb);
        },
        getNodesByFlow: function (e, cb) {
            util.request("flow/getNodeByFlow", e,cb);
        },
        commit: function (e, cb) {
            util.request2("flow/commit", e, cb);
        },
        getUnFinishTask: function (e, cb) {
            util.request("task/getUnfinishTask", e, cb);
        },
        getTaskList: function (e, cb) {
            util.request2("/task/getList", e, cb);
        },
        startTask: function (e, cb) {
            util.request("task/commit", e, cb);
        },
        taskFileUpload: function (e, cb) {
            util.uploadFile(e, cb);
        },
        downLoadTaskFile: function (e, cb) {
            util.downLoad(e, cb);
        },
        addFlowFile: function (e, cb) {
            util.request("task/addFlowFile", e, cb);
        },
        addFlowEx: function (e, cb) {
            util.request("/task/addFlowEx", e, cb);
        },
        closeFlowEx: function (e, cb) {
            util.request("task/closeEx", e, cb);
        },
        getExTypes: function (e, cb) {
            util.request("exception/getExTypes", e, cb);
        },
        getExType2s: function (e, cb) {
            util.request("exception/getExtype2s", e, cb);
        },
        getFlowByRecord: function (e, cb) {
            util.request("flow/getFlowByRecord", e, cb);
        }
    }
}