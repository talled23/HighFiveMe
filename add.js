var button = document.getElementById("btn");
var postNameCounter = 0;
button.addEventListener("click", function () {
    // it says elements
    document.getElementsByClassName("display-1")[0].innerHTML = "Hello World";
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