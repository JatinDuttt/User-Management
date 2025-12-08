let name = document.getElementById("name")
let email= document.getElementById("email")
let mobile = document.getElementById("mobile")
let pass = document.getElementById("pass")
let tbody= document.getElementById("tbody")
let searchData=document.getElementById("search")
let btnsearch=document.getElementById("btnsearch")

let arr=[];
function adduser() {

    if(name.value == "" || email.value == "" ||
      mobile.value == "" || pass.value =="")
        return alert("all fields are required")





        btnsearch.disabled=false;



    let obj={
        name:name.value,
        email:email.value, 
        mobile:mobile.value, 
        pass:pass.value
    }
    
    arr.push(obj)
    console.log(arr);
    displayUser(arr)

   name. value = ""
   email.value =""
   mobile.value = ""
   pass. value = ""
}


function displayUser(){
    tbody.textContent = "";
    arr.map((res, index)=>{
    let tr = document.createElement("tr");
    let Snotd = document.createElement("td");
    let nametd = document.createElement("td");
    let emailtd = document.createElement("td"); 
    let mobiletd = document.createElement("td");
    let passtd= document.createElement("td");
    let buttontd=document.createElement("td")
    let button=document.createElement("button")

    Snotd.textContent = index+1;
    nametd.textContent = res.name;
    emailtd.textContent=res.email;
    mobiletd.textContent=res.mobile;
    passtd.textContent=res.pass;
    button.textContent="delete"
    button.addEventListener("click",()=>{
        deleteuser(index)
    })

    tr.append(Snotd, nametd,emailtd,mobiletd,passtd,buttontd);
    buttontd.append(button)
    tbody.append(tr)
})
    }



    function deleteuser(id){
       arr.splice(id,1)
        console.log(arr);
        displayUser()
        
    }
   
    
    function searchUser(){
        if(searchData.value == "")
            return;


        let findUser = arr.find((i)=>i.name === searchData.value)
        if(findUser){ 
     name.value = findUser.name
    email.value = findUser.email;
    mobile.value = findUser.mobile;
    pass.value = findUser.pass;
    return;
    }
 alert("user not found")
}



function updateUser(){
let findUser = arr.findIndex((i)=>i.name
=== searchData.value)

let obj = {
name: name. value,
email:email.value,
mobile:mobile.value,
pass: pass. value,
}
if(findUser !==- 1){
arr.splice(findUser, 1, obj)
displayUser()
name. value = ""
email.value =
mobile.value = ""
pass. value = ""
searchData.value=""

}}

