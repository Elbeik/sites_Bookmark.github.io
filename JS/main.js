var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('SiteURL');

var bookmarkArray = [];

if(localStorage.getItem('myBookmark') != null)
{
    bookmarkArray = JSON.parse(localStorage.getItem('myBookmark'));
    dispalyBookmark(bookmarkArray);
}
else
{
    bookmarkArray = [];
}

function addBookmark(){

    var expression  = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    var bookmark = {
        name:siteName.value,
        url:siteURL.value,
    }
    if((bookmark.name == '') && (bookmark.url == '') )
    {
        removeAlert();
        alertName();
        alertUrl();
    }
    else if((bookmark.name == '') &&  !(bookmark.url.match(expression)) )
    {
        removeAlert()
        alertName();
        alertUrlMatch();
    }
    else if((bookmark.name == '') && (bookmark.url.match(expression)))
    {
        removeAlert()
        alertName();
    }
    else if(!(bookmark.name == '' ) && (bookmark.url == '') )
    {
        removeAlert()
        alertUrl();
    }
    else if(!(bookmark.name == '' ) && !(bookmark.url.match(expression)))
    {
        removeAlert()
        alertUrlMatch();
    } 
    else
    {
        bookmarkArray.push(bookmark);
        localStorage.setItem('myBookmark',JSON.stringify(bookmarkArray));
        dispalyBookmark(bookmarkArray)
        clearArea()
        console.log(bookmarkArray);
        removeAlert();
    }
    
}

function alertName(){
    document.getElementById('name').innerHTML = `<h4 class="mb-4 p-1 ch4 mx-auto">Name is required</h4>`;

}
function alertUrl(){
    document.getElementById('url').innerHTML = `<h4 class="mb-4 p-1 ch4 mx-auto">Url Field is required</h4>`;
}
function alertUrlMatch(){
    document.getElementById('urlMatch').innerHTML = `<h4 class="mb-4 p-1 ch4 mx-auto">Wrong Url</h4>`;
}
function UrlGet(){
    bookmark.url = siteURL.value;
}

function removeAlert(){
    document.getElementById('name').innerHTML = "";
    document.getElementById('url').innerHTML = "";
    document.getElementById('urlMatch').innerHTML ="";
}

function clearArea(){
    siteName.value = '';
    siteURL.value = '';
}

function dispalyBookmark(list){

    var addItems =``;
    for(var i=0 ; i < list.length; i++)
    {
        addItems += `
        <div class="row bg-linear py-4 mb-3">
                <div class="col-3">
                    <h2>${list[i].name}</h2>
                </div>
                <div class="col-9 d-flex">
                     <a href="${list[i].url}" target="_blank" class="btn btn-primary mx-3">visit</a>
                     <button onclick="deleteBookmark(${i});" class="btn btn-dangers btndelete">delete</button>
                </div>

            </div>
        `
    }
    document.getElementById('bookmarkShow').innerHTML = addItems;
}

function deleteBookmark(del){

    bookmarkArray.splice(del,1);
    localStorage.setItem('myBookmark',JSON.stringify(bookmarkArray));
    dispalyBookmark(bookmarkArray)

}



