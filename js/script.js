var SName = document.getElementById('SiteName');
var SUrl = document.getElementById('SiteUrl');
var SearchSite = document.getElementById('searchInput')
var addBtn = document.getElementById('addSite')
var goLink = document.getElementById('mybtn')
var CurrentIndex = 0;




if (localStorage.getItem('BookMarks') == null) {
    var BookContainer = []
} else {
    var BookContainer = JSON.parse(localStorage.getItem('BookMarks'))
    displayBookMark()
}
//creat
function creatBookMark() {
    var BookMark = {
        SName: SiteName.value,
        SUrl: SiteUrl.value,
    }
    BookContainer.push(BookMark);
    // console.log(BookContainer)
    localStorage.setItem('BookMarks', JSON.stringify(BookContainer))
    clearForm()
    displayBookMark()
}

function getBookInfo(index) {
    CurrentIndex = index;
    SName.value = BookContainer[index].SName;
    SUrl.value = BookContainer[index].SUrl;
    addBtn.innerHTML = 'Update'
}

addBtn.onclick = function () {
    if (ValidateSname() == true && SName.value != '') {
        if (addBtn.innerHTML == 'Submite') {
            creatBookMark()
        }
        else {
            updateSite()
        }
        localStorage.setItem('BookMarks', JSON.stringify(BookContainer))
        displayBookMark()
        clearForm()
    }
    else {
        alert('Enter Valid Site')
    }
}
//update
function updateSite() {
    var BookMark = {
        SName: SiteName.value,
        SUrl: SiteUrl.value,
    }
    BookContainer[CurrentIndex] = BookMark;
    addBtn.innerHTML = 'Submite'
    localStorage.setItem('BookMarks', JSON.stringify(BookContainer))
    displayBookMark()
    clearForm()
}
//clear

function clearForm() {
    SName.value = '';
    SUrl.value = '';

}
//display
function displayBookMark() {
    var trs = '';
    for (var i = 0; i < BookContainer.length; i++) {
        trs += `
        <tr>
        <th>${i}</th>
        <td id="SName">${BookContainer[i].SName}</td>
<td>
<a href="${BookContainer[i].SUrl}"class="btn btn-success" id="visitBtn"  target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
</td>     
<td>
<button onclick="getBookInfo(${i})" class="btn btn-success"><i class="fa fa-solid fa-edit"></i></button>
</td>
<td>
<button onclick="delet(${i})" class="btn btn-warning" id=delete><i class="fa-solid fa-trash"></i></button>
</td>
        </tr>`
    }
    document.getElementById("tablebody").innerHTML = trs;
}
//delete
function delet(index) {
    BookContainer.splice(index, 1)
    // console.log(productContainer)
    displayBookMark()
    window.localStorage.removeItem('BookMarks');
}
//search
function searchSite() {
    // console.log(searchInput.value)
    var trs = '';
    for (var i = 0; i < BookContainer.length; i++) {
        if (BookContainer[i].SName.toLowerCase().includes(SearchSite.value.toLowerCase())) {
            trs += `
            <tr>
            <th>${i}</th>
            <td id="SName">${BookContainer[i].SName}</td>
    <td>
    <a href="${BookContainer[i].SUrl}" class="btn btn-success"id="visitBtn" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </td>  
    
    <td>
    <button onclick="getBookInfo(${i})" class="btn btn-success"><i class="fa fa-solid fa-edit"></i></button>
    </td>
    <td>
    <button onclick="delte(${i})" class="btn btn-warning"><i class="fa-solid fa-trash"></i></button>
    </td>
            </tr>`
        }

    }
    document.getElementById("tablebody").innerHTML = trs;
}

//Validation
function ValidateSname() {
    var nameRegx = /^[A-Z][a-z]{3,13}$/
    var SiName = SName.value;
    nameRegx.test(SiName)
    if (nameRegx.test(SiName) == true) {
        return true
    }
    else {
        return false
    }

}
//Visit Button
function visitUrl() {
    var SiLink = SUrl.value
}
