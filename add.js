var button = document.getElementById("btn");

if (localStorage.getItem('editIndex')!=null) {
    // potentially an issue - editIndex may store as a string so if this doesn't work thats prob why
    var postList = JSON.parse(localStorage.getItem("prevItems"));
    var index = JSON.parse(localStorage.getItem('editIndex'));
    localStorage.removeItem('editIndex');
    var postData = postList[index];
    console.log(postData);
    document.querySelector('#name').value = postData.title;
    document.querySelector('#tags').value = postData.tags;
    document.querySelector('#num1').value = postData.items[0];
    document.querySelector('#num2').value = postData.items[1];
    document.querySelector('#num3').value = postData.items[2];
    document.querySelector('#num4').value = postData.items[3];
    document.querySelector('#num5').value = postData.items[4];
}

button.addEventListener("click", function () {

    // add a check here to make sure none of the fields are empty
    // we could do something as simple as alert()

    var name = document.getElementById("name").value;
    var tags = document.getElementById("tags").value.split(",");
    var items = [];
    items.push(document.getElementById("num1").value);
    items.push(document.getElementById("num2").value);
    items.push(document.getElementById("num3").value);
    items.push(document.getElementById("num4").value);
    items.push(document.getElementById("num5").value);

    var post = new PostData(name, tags, items);
    var postList = JSON.parse(localStorage.getItem("prevItems"))
    if(postList == null){
        localStorage.setItem("prevItems", JSON.stringify([post]));
        console.log("storage: " + localStorage.getItem("prevItems"));
    }
    else {
       postList.push(post)
       console.log("postList: " + postList);
       localStorage.setItem("prevItems", JSON.stringify(postList))
       console.log("storage: " + localStorage.getItem("prevItems"));
    }
    


    // Tests
    console.log(post.toString());
    console.log("List Items: " + items);
    console.log("List Tags: " + tags);
});

class PostData {
    constructor(title, tags, items) {
        this.title = title;
        this.tags = tags;
        this.items = items;
    }
}