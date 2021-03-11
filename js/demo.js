var modifyid = 0;

function showAll() {
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();
}
$(document).ready(function() {
    $(".title").css("transform", "translateX(-50%) translateY(0px)");
    $(".title").css("opacity", "1");
    $(".table").css("transform", "translateX(-50%) translateY(0px)");
    $(".table").css("opacity", "1");
    $(".effect").css("transform", "translateX(-50%) translateY(0px)");
    $(".effect").css("opacity", "1");
    if ($(".table").width() == $("table").width())
        $(".table").removeClass("addShadow");
    $(".table").scroll(function() {
        if ($(".table").scrollLeft() + $(".table").width() >= $("table").width() - 20) {
            $(".table").removeClass("addShadow");
        } else if ($(".table").width() < $("table").width()) {
            $(".table").addClass("addShadow");
        }
    });

    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
    $('body').popover({ selector: '[data-toggle="popover"]' });
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();

    $('.modal [data-dismiss="modal"]').click(function() {
        console.log('Closed modal');
    });

    function resetAddForm() {
        $("#addcnname").val("");
        $("#addenname").val("");
        $("#addman").prop("checked", true);
        $("#addwoman").prop("checked", false);
        $("#addcell").val("");
        $("#addemail").val("");
        $("#addcnname").removeClass("is-invalid");
        $("#addcell").removeClass("is-invalid");
        $("#addemail").removeClass("is-invalid");
    }
    $('#addAdd').click(function(event) {
        var url = "ajax/ajaxCard";
        var cnname = $("#addcnname").val();
        var enname = $("#addenname").val();
        var sex = $('input:radio:checked[name="addsex"]').val();
        var cell = $("#addcell").val();
        var email = $("#addemail").val();
        var ajaxobj = new AjaxObject(url, 'json');

        if (!$("#addcnname")[0].checkValidity())
            $("#addcnname").addClass("is-invalid");
        else
            $("#addcnname").removeClass("is-invalid");
        if (!$("#addcell")[0].checkValidity())
            $("#addcell").addClass("is-invalid");
        else
            $("#addcell").removeClass("is-invalid");
        if (!$("#addemail")[0].checkValidity())
            $("#addemail").addClass("is-invalid");
        else
            $("#addemail").removeClass("is-invalid");

        if ($('#addform')[0].checkValidity()) {
            $("#addcnname").removeClass("is-invalid");
            $("#addcell").removeClass("is-invalid");
            $("#addemail").removeClass("is-invalid");
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.sex = sex;
            ajaxobj.cell = cell;
            ajaxobj.email = email;

            ajaxobj.add();

            resetAddForm();
            $("#addModal").modal('toggle');

        }

        event.preventDefault();

    });
    $("#addReset").click(() => resetAddForm());
    $(".addClose").click(() => resetAddForm());


    function resetSearchForm() {
        $("#secnname").val("");
        $("#seenname").val("");
        $("#seman").prop("checked", false);
        $("#sewoman").prop("checked", false);
        $("#secell").val("");
        $("#seemail").val("");
        $("#secnname").removeClass("is-invalid");
        $("#secell").removeClass("is-invalid");
        $("#seemail").removeClass("is-invalid");
    }
    $("#searchSearch").click(function(e) {
        var url = "ajax/ajaxCard";
        // var data = $("#searchform").serialize();
        var cnname = $("#secnname").val();
        var enname = $("#seenname").val();
        var sex = $('input:radio:checked[name="sesex"]').val();
        var cell = $("#secell").val();
        var email = $("#seemail").val();
        var ajaxobj = new AjaxObject(url, 'json');

        ajaxobj.cnname = cnname;
        ajaxobj.enname = enname;
        if (sex == "man") ajaxobj.sex = "0";
        else if (sex == "woman") ajaxobj.sex = "1";
        ajaxobj.cell = cell;
        ajaxobj.email = email;

        var toSearch = [];
        if (ajaxobj.cnname) toSearch.push("cnname");
        if (ajaxobj.enname) toSearch.push("enname");
        if (ajaxobj.sex) toSearch.push("sex");
        if (ajaxobj.cell) toSearch.push("cell");
        if (ajaxobj.email) toSearch.push("email");

        ajaxobj.search(toSearch);

        resetSearchForm();
        $("#searchModal").modal('toggle');
        // }

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    $("#searchReset").click(() => resetSearchForm());
    $(".closeReset").click(() => resetSearchForm());



    // 自適應視窗
    $(window).resize(function() {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);

        console.log($(".table").width() + ", " + $("table").width())
        if ($(".table").width() < $("table").width())
            $(".table").addClass("addShadow");
        else
            $(".table").removeClass("addShadow");

    });
});

function startDelete(id) {
    // var deleteid = id.substring(12);
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.id = id;
    $("#deleteModify").click(() => ajaxobj.delete(id));

}

function startModify(id) {
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    console.log("startModify: " + id);
    ajaxobj.modify_get(id);
}

function refreshTable(data, id) {
    // alert(id);
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $("#cardtable tbody > h5").remove();
    $(".noResult").slideUp();
    $.each(data, function(key, item) {
        console.log(item.s_sn)
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr ></tr>");
        // row.append($("<td></td>").html(item.s_sn));
        row.append($("<td style='padding-left:20px' data-toggle='tooltip' data-placement='right' title='[" + strsex + "]" + item.cnname + "(" + item.enname + ")'></td>").html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(strsex));
        row.append($("<td data-toggle='popover' data-placement='bottom' data-content='聯絡方式：" + item.cell.substring(0, 4) + "-" + item.cell.substring(4, 7) + "-" + item.cell.substring(7, 10) + "'></td>").html(item.cell));
        row.append($("<td></td>").html(item.email));
        row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '" class="modifybutton btn btn-secondary" type="button" data-toggle="modal" data-target="#modifyModal" onclick="startModify(' + item.s_sn + ')">修改<span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td> style='margin-right:10px'</td>").html('<button id="deletebutton' + item.s_sn + '" class="deletebutton btn btn-danger" type="button" data-toggle="modal" data-target="#deleteModal" onclick="startDelete(' + item.s_sn + ')">刪除<span class="glyphicon glyphicon-list-alt"></span></button>'));
        $("#cardtable").append(row);
        if (id != "0" && item.s_sn == id)
            $(row).effect("highlight", 3000);
        else if (id == "0")
            $(row).effect("highlight", 3000);
    });
    if (data.length == 0) {
        $(".noResult").slideDown();
    }
}

function initEdit(response, id) {
    console.log("initEdit: ", id);

    modifyid = id; //$("#cardtable").attr('id').substring(12);

    $("#mocnname").val(response.cnname);
    $("#moenname").val(response.enname);
    if (response.sex == 0) {
        $("#modifyman").prop("checked", true);
        $("#modifywoman").prop("checked", false);
    } else {
        $("#modifyman").prop("checked", false);
        $("#modifywoman").prop("checked", true);
    }
    $("#mocell").val(response.cell);
    $("#moemail").val(response.email);
    $("#modifysid").val(modifyid);
    $("#modifyModify").click(function(e) {
        console.log("#modifyModify.click: " + modifyid);
        // $("#modifyform").submit();
        var url = "ajax/ajaxCard";
        var cnname = $("#mocnname").val();
        var enname = $("#moenname").val();
        var cell = $("#mocell").val();
        var email = $("#moemail").val();
        var sex = $('input:radio:checked[name="mosex"]').val();
        var ajaxobj = new AjaxObject(url, 'json');


        if (!$("#mocnname")[0].checkValidity())
            $("#mocnname").addClass("is-invalid");
        else
            $("#mocnname").removeClass("is-invalid");
        if (!$("#mocell")[0].checkValidity())
            $("#mocell").addClass("is-invalid");
        else
            $("#mocell").removeClass("is-invalid");
        if (!$("#moemail")[0].checkValidity())
            $("#moemail").addClass("is-invalid");
        else
            $("#moemail").removeClass("is-invalid");

        if ($('#modifyform')[0].checkValidity()) {
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.sex = sex;
            ajaxobj.cell = cell;
            ajaxobj.email = email;
            ajaxobj.id = id;
            ajaxobj.modify(modifyid);

            resetModifyForm();
            $("#modifyModal").modal('toggle');
        }

        e.preventDefault(); // avoid to execute the actual submit of the form.

    });

    function resetModifyForm() {
        $("#mocnname").val("");
        $("#moenname").val("");
        $("#modifyman").prop("checked", true);
        $("#modifywoman").prop("checked", false);
        $("#mocell").val("");
        $("#moemail").val("");
        $("#mocnname").removeClass("is-invalid");
        $("#mocell").removeClass("is-invalid");
        $("#moemail").removeClass("is-invalid");
    }
    $("#modifyReset").click(() => resetModifyForm());
    $(".modifyclose").click(() => resetModifyForm());
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

var memberData = [
    { "s_sn": "35", "cnname": "邱小甘", "enname": "Peter", "sex": "0", "cell": "0900123456", "email": "peter@gmail.com" },
    { "s_sn": "49", "cnname": "蔡凡昕", "enname": "Allen", "sex": "0", "cell": "0976189743", "email": "allen@gmail.com" },
    { "s_sn": "50", "cnname": "趙雪瑜", "enname": "Sharon", "sex": "0", "cell": "0955273918", "email": "sharon@gmail.com" },
    { "s_sn": "51", "cnname": "賴佳蓉", "enname": "Yoki", "sex": "1", "cell": "0928182748", "email": "yoki@gmail.com" },
    { "s_sn": "54", "cnname": "羅云謙", "enname": "Chien", "sex": "1", "cell": "0976520007", "email": "yunchienlo@gmail.com" }
];

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname = '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function() {
    alert("Alert:");
}
AjaxObject.prototype.getall = function() {
    // response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","cell":"0900123456", "email":"peter@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","cell":"0976189743", "email":"allen@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","cell":"0955273918", "email":"sharon@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","cell":"0928182748", "email":"yoki@gmail.com"}]';
    response = JSON.stringify(memberData);
    refreshTable(JSON.parse(response), "0");
}
AjaxObject.prototype.add = function() {
    // response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","cell":"0900123456", "email":"peter@gmail.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","cell":"0976189743", "email":"allen@gmail.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","cell":"0955273918", "email":"sharon@gmail.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","cell":"0928182748", "email":"yoki@gmail.com"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1","cell":"0900000000", "email":"newaccount@gmail.com"}]';
    var s_sn = memberData[memberData.length - 1].s_sn;
    memberData.push({ "s_sn": parseInt(s_sn) + 1, "cnname": this.cnname, "enname": this.enname, "sex": this.sex, "cell": this.cell, "email": this.email })
    response = JSON.stringify(memberData);
    refreshTable(JSON.parse(response), s_sn);
    // $("#dialog-addconfirm").dialog("close");
}
AjaxObject.prototype.modify = function(id) {
    // alert("modify: " + id)
    // response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","cell":"0976189743", "email":"allen@gmail.com"}]';
    for (var i = 0; i < memberData.length; i++) {
        if (memberData[i].s_sn == id) {
            console.log(memberData[i].s_sn + ", " + id)
            memberData[i].cnname = this.cnname;
            memberData[i].enname = this.enname;
            memberData[i].sex = this.sex;
            memberData[i].cell = this.cell;
            memberData[i].email = this.email;
            break; //Stop this loop, we found it!
        }
    }
    response = JSON.stringify(memberData);
    refreshTable(JSON.parse(response), id.toString());
}
AjaxObject.prototype.modify_get = function(id) {
    for (var i = 0; i < memberData.length; i++) {
        // console.log(memberData[i].s_sn + ", " + id)
        if (memberData[i].s_sn == id) {
            response = JSON.stringify(memberData[i]);

            break; //Stop this loop, we found it!
        }
    }
    initEdit(JSON.parse(response), id);
}

var isSearching;
AjaxObject.prototype.search = function() {

    isSearching = this;
    let searchArr = memberData.filter(function(el) {
        if (isSearching.sex) {
            console.log("isSearching.sex" + isSearching.sex);
            return el.cnname.includes(isSearching.cnname) &&
                el.enname.includes(isSearching.enname) &&
                el.sex === isSearching.sex &&
                el.cell.includes(isSearching.cell) &&
                el.email.includes(isSearching.email);
        } else {
            return el.cnname.includes(isSearching.cnname) &&
                el.enname.includes(isSearching.enname) &&
                el.cell.includes(isSearching.cell) &&
                el.email.includes(isSearching.email);
        }
    });
    response = JSON.stringify(searchArr)
    refreshTable(JSON.parse(response), "0");
    // $("#dialog-searchconfirm").dialog("close");
}
AjaxObject.prototype.delete = function(id) {
    console.log("delete: " + id)
    for (var i = 0; i < memberData.length; i++) {
        if (memberData[i].s_sn == id) {
            memberData.splice(i, 1);
            break; //Stop this loop, we found it!
        }
    }
    response = JSON.stringify(memberData);
    refreshTable(JSON.parse(response));

}

window.addEventListener("scroll", function() {
    var height = $(window).scrollTop();
    if (height > 30) {
        $('.title').addClass("fix-search");
        // console.log("add");
    } else {
        $('.title').removeClass("fix-search");
        // console.log("remove");
    }

}, false);