// $(function () {
//     if (!global.userIdentity || !global.userIdentity.success) {
//         window.parent.location.href = "/web/login.html";
//     }
// });
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

window.global = { userIdentity: JSON.parse(getCookie("useridentity"))};
window.util = {
    getProType: function (e) {
        if (e === 1) return "内销项目";
        else if (e === 2) return "外销项目";
        else if (e === 3) return "B2B项目";
        else return "";
    },
    getMachineType: function (e) {
        if (e === 1) return "全新项目";
        else if (e === 2) return "派生项目";
        else if (e === 3) return "配屏项目";
        else return "";
    },
    getFileState: function (e) {
        if (!e || e === 0) return "未上传";
        else if (e === 1) return "未审批";
        else if (e === 2) return "等待审批";
        else if (e === 3) return "已审批";
        return "";
    },
    getExLevel: function (e) {
        if (!e || e === 1) return "A";
        else if (e === 2) return "B";
        else if (e === 3) return "C";
        else if (e === 4) return "D";
        return "";
    },
    getMilePost: function (e) {
        if (e === 11) return "项目立项";
        else if (e === 1) return "EVT";
        else if (e === 2) return "DVT";
        else if (e === 3) return "PVT";
        else if (e === 4) return "PMP";
        else if (e === 5) return "MP";
        return "";
    },
    getProState: function (e) {
        if (e === 0) return "待立项";
        if (e === 1) return "待立项审批";
        if (e === 2) return "未完成";
        if (e === 3) return "已完成";
    },
    getDatetime: function (d) {
        var date = new Date();
        if (d) date = new Date(d);


        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;

        var day = date.getDate();
        if (day < 10) day = "0" + day;

        var hour = date.getHours();
        if (hour < 10) hour = "0" + hour;

        var minute = date.getMinutes();
        if (minute < 10) minute = "0" + minute;

        var sec = date.getSeconds();
        if (sec < 10) sec = "0" + sec;

        return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;
    },
    getDate: function (d) {
        var date = new Date();
        if (d) date = new Date(d);
        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;

        var day = date.getDate();
        if (day < 10) day = "0" + day;
        return date.getFullYear() + "-" + month + "-" + day;
    },
    setUser: function (user) {
        if (!window.global) window.global = { userIdentity: {} };
        global.userIdentity.user = user;
    },
    isUnfinished: function (a, b) {
        if (b.state === 1) return false;
        if (b.nodeid === 11) return true;
        return (a + 1) > b.nodeid;
    },
    request: function (url, data, cb) {
        if (!url) return;
        if (url[0] != '/' && url[0] != '\\') url = "/" + url;

        //console.log("开始请求！"+e.url);
        $.ajax({
            url: 'http://172.20.248.220:8088/dms/pms' + url,
            //url: 'http://172.20.73.7:8888/pms' + url,
            headers: {
                token: global.userIdentity.token,
                user: global.userIdentity.user.id,
            },
            method: 'post',
            data: data,
            dataType: 'Json',
            //contentType:'application/json',
            success: function (msg) {
                 
                if (msg.success) {
                    if (cb) cb(msg.result);
                }
                else
                    alert(msg.msg);
            },

            //complete: function (e) {
            //    console.log("请求完成！");
            //    console.log(e);
            //    console.log("-------------------------");
            //}
        }
        );
    },
    request2: function (url, data, cb) {
        if (!url) return;
        if (url[0] != '/' && url[0] != '\\') url = "/" + url;
        data = $.extend(data, { start: 0, limit: 100 });
        //console.log("开始请求！"+e.url);
        $.ajax({
            url: 'http://172.20.248.220:8088/dms/pms' + url,
            //url: 'http://172.20.73.7:8888/pms' + url,
            headers: {
                token: global.userIdentity.token,
                user: global.userIdentity.user.id,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: JSON.stringify(data) || {},
            dataType: 'Json',
            //contentType:'application/json',
            success: function (msg) {
                if (msg.success) {
                    if (cb) cb(msg.result);
                }
                else
                    alert(msg.msg);
            },

            //complete: function (e) {
            //    console.log("请求完成！");
            //    console.log(e);
            //    console.log("-------------------------");
            //}
        });
    },
    uploadFile: function (e, cb) {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("id", e.id);

        $.ajax({
            type: "POST",
            url: 'http://172.20.248.220:8088/dms/pms/task/upload',
            headers: {
                token: global.userIdentity.token,
                user: global.userIdentity.user.id,
                //'Accept': 'application/json',
                //'Content-Type': 'application/json'
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (msg) {
                if (msg.success) {
                    if (cb) cb(msg);
                }
                else alert(msg.msg);
            }
        });
    },
    downLoad: function (e, cb) {
        $.ajax({
            type: "POST",
            url: 'http://172.20.248.220:8088/dms/pms/task/download?id=' + e.id,
            headers: {
                token: global.userIdentity.token,
                user: global.userIdentity.user.id,
                'Accept': 'application/json',
                'Content-Type': 'utf-8'
            },
            success: function (msg) {
                if (msg.success) {
                    if (cb) cb(msg);
                }
                else alert(msg.msg);
            }
        });
    },
    // commit: function (flowid, project, cb) {
    //     var that = this;
    //     this.selectUser(project, function (args) {
    //         var commitParam = { id: flowid };
    //         commitParam.toid = args.param.id,
    //         commitParam.toname = args.param.name,
    //         commitParam.commond = args.param.commond,
    //         that.request2("flow/commit", commitParam , function (e1) {
    //              args.dialog.close();
    //              if (cb) cb();
    //         });
    //     });
    // },
    // selectUser: function (project, cb) {
    //     this.dialog({
    //         url: '/web/selectUser.html',
    //         title: '选择审批人员',
    //         param: project,
    //         width: 500,
    //         height: 350,
    //         onOk: function (args) {
    //             if (cb) cb(args);
    //         },
    //     });
    // },
    getParam: function () {
        return window.top.sysParam;
    },
    setParam: function (param) {
        window.top.sysParam = param;
    },
    openParamPage: function (url, param) {
        window.top.openCommandPage(url);
        this.setParam(param);
    }
    // ,
    // dialog: function (e) { return window.top.MDialog(e); }
}






