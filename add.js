var isEditing = false;
var likes = 0;

document.getElementById("back-to-feed-button").addEventListener("click", () => {
    if (confirm("You must submit your edits using the button at the bottom.\nDo you wish to discard your edits?")) {
        localStorage.removeItem('editIndex');
        window.location.href = "index.html";
    }
})

if (localStorage.getItem('editIndex') != null) {
    var postList = JSON.parse(localStorage.getItem("prevItems"));
    var index = JSON.parse(localStorage.getItem('editIndex'));
    var postData = postList[index];
    if (postData != null) {
        likes = postData.likes;
    }

    document.querySelector('#name').value = postData.title;
    document.querySelector('#tags').value = postData.tags;
    document.querySelector('#num1').value = postData.items[0];
    document.querySelector('#num2').value = postData.items[1];
    document.querySelector('#num3').value = postData.items[2];
    document.querySelector('#num4').value = postData.items[3];
    document.querySelector('#num5').value = postData.items[4];

    isEditing = true;
}

var submitButton = document.getElementById("btn");
submitButton.addEventListener("click", function () {

    // add a check here to make sure none of the fields are empty
    // we could do something as simple as alert()

    var name = document.getElementById("name").value;
    var tags = document.getElementById("tags").value.split(",");

    // this doesn't work
    if (name == "" || tags == null ||
        document.getElementById("num1").value == "" ||
        document.getElementById("num2").value == "" ||
        document.getElementById("num3").value == "" ||
        document.getElementById("num4").value == "" ||
        document.getElementById("num5").value == "") {
    }
    else {
        
        var tags = document.getElementById("tags").value.split(",");
        var items = [];
        items.push(document.getElementById("num1").value);
        items.push(document.getElementById("num2").value);
        items.push(document.getElementById("num3").value);
        items.push(document.getElementById("num4").value);
        items.push(document.getElementById("num5").value);

        var post = new PostData(name, tags, items, likes);
        var postList = JSON.parse(localStorage.getItem("prevItems"))

        if (isEditing) {
            var index = JSON.parse(localStorage.getItem('editIndex'));
            postList[index] = post;
            localStorage.setItem("prevItems", JSON.stringify(postList))
            console.log("storage: " + localStorage.getItem("prevItems"));

            localStorage.removeItem('editIndex');
            isEditing = false;
        }
        else {
            if (postList == null) {
                localStorage.setItem("prevItems", JSON.stringify([post]));
                console.log("storage: " + localStorage.getItem("prevItems"));
            }
            else {
                postList.push(post)
                console.log("postList: " + postList);
                localStorage.setItem("prevItems", JSON.stringify(postList))
                console.log("storage: " + localStorage.getItem("prevItems"));
            }
        }
        // Tests
        console.log(post.toString());
        console.log("List Items: " + items);
        console.log("List Tags: " + tags);
        console.log("Likes of Post at index " + index + ": " + likes);
        window.location.href = "index.html";
    }
});

class PostData {
    constructor(title, tags, items, likes) {
        this.title = title;
        this.tags = tags;
        this.items = items;
        this.likes = likes;
    }
}