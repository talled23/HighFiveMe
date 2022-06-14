
console.log(localStorage.getItem("prevItems"))
var postList = JSON.parse(localStorage.getItem("prevItems"));
console.log(postList);

if (postList != null) {
    for(var i=postList.length-1; i>=0; i--){
        console.log("Adding index " + i);
        createPost(postList[i], i)
    }
}

function createPost(postData, index) {
    // later: add id to these elements for CSS purposes
    const element = document.createElement("li");
    element.style.width = 'auto';
    element.classList.add('list-group-item');
    element.classList.add('my-5');

    const div1 = document.createElement("div");
    div1.classList.add('card');
    div1.style.backgroundColor = "#FFFF99";
    element.appendChild(div1);

    const postHeader = document.createElement("div");
    postHeader.classList.add('card-header');

    const postTitle = document.createElement("div");

    postTitle.innerHTML = ("Top 5 " + postData.title).bold();
    postTitle.style.fontSize = '25px'
    postHeader.appendChild(postTitle);
    div1.appendChild(postHeader);

    const username = document.createElement("div");
    username.classList.add('card-subtitle');
    username.classList.add('mb-2');
    username.classList.add('text-muted');
    username.innerHTML = "by " + postData.username + " at " + postData.time;
    postHeader.appendChild(username);

    const tagsHolder = document.createElement("div");
    tagsHolder.classList.add('card-subtitle');
    tagsHolder.classList.add('mb-2');
    tagsHolder.classList.add('text-muted');
    tagsHolder.innerHTML = "Tags: " + postData.tags;
    postHeader.appendChild(tagsHolder);

    const likeButton = document.createElement("button");
    likeButton.classList.add('btn');
    likeButton.classList.add('btn-primary');
    const image = document.createElement("img");
    image.src = "highfive.png";
    image.style.width = "40px";
    image.style.height = "40px";
    image.style.marginRight = "5px";
    likeButton.appendChild(image);
    const image2 = document.createElement("img");
    image.classList.add("p-1");
    image2.classList.add("p-1");
    image2.src = "downfive.png";
    image2.style.width = "40px";
    image2.style.height = "40px";
    likeButton.appendChild(image2);

    const likesNumber = document.createElement("span");
    likesNumber.id = "likes-counter";
    likesNumber.classList.add('badge');
    likesNumber.classList.add('badge-light');

    var likeCount = postData.likes;
    likesNumber.innerHTML = likeCount;
    likeButton.appendChild(likesNumber);
    postHeader.appendChild(likeButton);

    image.addEventListener("click", ()=>{
        image.style.borderColor = "#43FF33";
        image2.style.borderColor = "#555";
        likesNumber.innerHTML = ++likeCount;
        addLike(likeCount, index);
    })
    image2.addEventListener("click", ()=>{
        image2.style.borderColor = "red";
        image.style.borderColor = "#555";
        likesNumber.innerHTML = --likeCount;
        addLike(likeCount, index);
    })

    const top5list = document.createElement("ul");
    top5list.classList.add('list-group');
    top5list.classList.add('list-group-flush');
    div1.appendChild(top5list);

    for (var i=0; i<5; i++) {
        const item = document.createElement("li");
        item.style.backgroundColor = "#FFFF99";
        item.classList.add('list-group-item');
        item.innerHTML = (i+1) + ". " + postData.items[i];
        top5list.appendChild(item);
    }

    const postButtonsDiv = document.createElement("div");

    const anchor = document.createElement("a");
    anchor.href = "add.html";

    const editPostButton = document.createElement("button");
    editPostButton.classList.add("btn");
    editPostButton.classList.add("me-3");
    editPostButton.classList.add("btn-outline-primary");
    editPostButton.classList.add("btn-lg");
    editPostButton.classList.add("edit");
    editPostButton.innerHTML="Edit";
    editPostButton.addEventListener("click", ()=> {
        localStorage.setItem('editIndex', index);
    })
    anchor.appendChild(editPostButton);

    const deletePostButton = document.createElement("button");
    deletePostButton.classList.add("btn");
    editPostButton.classList.add("ms-3");
    deletePostButton.classList.add("btn-outline-danger");
    deletePostButton.classList.add("btn-lg");
    deletePostButton.classList.add("delete");
    deletePostButton.innerHTML="Delete Post";
    deletePostButton.addEventListener("click", ()=> {
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(index);
        }
    })
    postButtonsDiv.appendChild(anchor);
    postButtonsDiv.appendChild(deletePostButton);
    postButtonsDiv.classList.add('my-2');
    postButtonsDiv.style.margin = "auto";
    div1.appendChild(postButtonsDiv);

    // Check this
    div1.style.margin = "auto";

    document.querySelector('ul').appendChild(element);
}

function addLike(count, index) {
    var prevItems = JSON.parse(localStorage.getItem("prevItems"));
    prevItems[index].likes = count;
    localStorage.setItem("prevItems", JSON.stringify(prevItems));
}

function deletePost(i) {
    // remove this post from prevItems
    // this shouldn't affect the loop becaue postList is taking the old prevItems
    var prevItems = JSON.parse(localStorage.getItem("prevItems"));
    prevItems.splice(i, 1);
    localStorage.setItem("prevItems", JSON.stringify(prevItems));
    localStorage.removeItem('editIndex');
    location.reload();
}