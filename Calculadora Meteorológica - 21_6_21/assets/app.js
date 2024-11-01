$(function () {
    function places (v) {
        return v ? Math.ceil(Math.round(v*10000)/10)/1000 : v;
    }
    (function Convert() {
        const f = document.getElementById("fahrenheit");
        const c = document.getElementById("celsius");
        for (let i = 0; i < 2; i++) {
            c.addEventListener("input", function (){
                var tempf;
                tempf = Arrend((((9/5)*parseFloat(c.value))+32));
                if(parseInt(tempf)!= tempf)
                    tempf=tempf.toFixed(1);
                f.value=tempf;
                CheckForm(c.value, f.value);
            });
            f.addEventListener("input", function (){
                var tempc;
                tempc = Arrend((5/9)*(parseFloat(f.value)-32));
                if(parseInt(tempc)!= tempc)
                    tempc=tempc.toFixed(1);
                c.value=tempc;
                CheckForm(c.value, f.value);
            });
        }
    })();
})
function CheckMax(object){
    if(object.value.length > 3){
        object.value = object.value.slice(0, 3);
    }
    if(object.value > 100){
        object.value = 100;
    }
};
function CheckTemp(object){
    var num = parseFloat(object.value);
    if(num > 100){
        num = 100;
        document.getElementById("Temp").style.borderBottom="1px solid red";
    }
    else   
        document.getElementById("Temp").style.borderBottom="1px solid #2e303075";
    if(parseInt(object.value)!=object.value)
        object.value = num.toFixed(1);
    else
        object.value=num;
};
function Arrend(num){
    return Math.round(num*100)/100;
};
function CheckArrend(object){
    var num = parseFloat(object.value);
    if(parseInt(object.value)!= object.value)
        object.value = num.toFixed(1);
};
function TempUR(){
    const tmp = document.getElementById("Temp");
    var aux_tmp=parseFloat(tmp.value);
    if(aux_tmp > 100)
        aux_tmp = 100;
    const ur = document.getElementById("UR");
    var aux_ur=parseFloat(ur.value);
    var dt = (aux_tmp-(0.55/100)*(1-aux_ur)*(aux_tmp-14));
    var po = Math.pow(aux_ur/100,1/8)*(112+0.9*aux_tmp)+(0.1*aux_tmp-112);
    var ua = (6.112*Math.pow(2.71828, (17.67*aux_tmp)/(aux_tmp+243.5))*aux_ur*2.1674)/(273.15+aux_tmp);
    dt = parseFloat(dt.toFixed(1));
    po = parseFloat(po.toFixed(1));
    ua = parseFloat(ua.toFixed(1));
    if(isNaN(dt))
        document.getElementById("DT").innerHTML=0;
    else
        document.getElementById("DT").innerHTML= dt+" °C";
    if(isNaN(po))
        document.getElementById("PO").innerHTML=0;
    else
        document.getElementById("PO").innerHTML= po+" °C";
    if(isNaN(ua))
        document.getElementById("UA").innerHTML=0;
    else
        document.getElementById("UA").innerHTML= ua+" g/m³";
};
function CheckForm(c, f){
    c = parseFloat(c);
    f = parseFloat(f);
    if(parseInt(c) == c)
        c=parseInt(c);
    else
        c = c.toFixed(1);
    if(parseInt(f)==f)
        f=parseInt(f);
    else
        f = f.toFixed(1);
    if(isNaN(f)||isNaN(c)){
        document.getElementById("outputf").innerHTML= "F = (C x 9/5) + 32";
        document.getElementById("outputc").innerHTML= "C = (F - 32) x  5/9";
    }
    else{
        document.getElementById("outputf").innerHTML= f+"°F = ("+c+"°C x 9/5) + 32";
        document.getElementById("outputc").innerHTML= c+"°C = ("+f+"°F - 32) x 5/9";
    }
};
function WindChill(){
    const tmp = document.getElementById("WTemp");
    var aux_tmp = parseFloat(tmp.value);
    if(aux_tmp > 10)
        aux_tmp=10;
    const vnt = document.getElementById("Vento");
    var aux_vnt = parseFloat(vnt.value);
    if(aux_vnt < 4.8)
        aux_vnt=4.8;
    aux_vnt=Math.pow(aux_vnt, 0.16);
    var wc = 13.12 + (0.6215*aux_tmp)-(11.37*(aux_vnt))+(0.3965*aux_tmp*(aux_vnt))
    if(isNaN(wc))
        document.getElementById("WC").innerHTML=0;
    else{
        wc=wc.toFixed(2);
        document.getElementById("WC").innerHTML= wc+" °C";
    }
}
function CheckTempWC(temp){
    var num = parseFloat(temp.value);
    if(num > 10){
        num=10;
        document.getElementById("WTemp").style.borderBottom="1px solid red";
    }
    else
        document.getElementById("WTemp").style.borderBottom="1px solid #2e303075";
    temp.value=num;
}
function CheckVent(v){
    var num = parseFloat(v.value);
    if(num < 4.8){
        num=4.8;
        document.getElementById("Vento").style.borderBottom="1px solid red";
    }
    else
        document.getElementById("Vento").style.borderBottom="1px solid #2e303075";
    v.value=num;
}
function Wipe(id){
    const object = document.getElementById(id);
    document.getElementById(id).style.borderBottom="1px solid #2e303075";
    object.value = "";
    TempUR();
    WindChill();
    CheckForm();
    Convert();
}
$(".mdl-textfield__input").keypress(
    function(event){
      if (event.which == '13' || event.which == '69' || event.which == '101') {
        event.preventDefault();
      }
});
