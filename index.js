
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
    element.classList.add('list-group-item');
    element.classList.add('my-5');

    const div1 = document.createElement("div");
    div1.classList.add('card');
    div1.style.width = '18rem';
    element.appendChild(div1);

    const postHeader = document.createElement("div");
    postHeader.classList.add('card-header');

    const postTitle = document.createElement("div");

    postTitle.innerHTML = ("Top 5 " + postData.title).bold();
    postTitle.style.fontSize = '25px'
    postHeader.appendChild(postTitle);
    div1.appendChild(postHeader);

    const tagsHolder = document.createElement("div");
    tagsHolder.classList.add('card-subtitle');
    tagsHolder.classList.add('mb-2');
    tagsHolder.classList.add('text-muted');
    tagsHolder.innerHTML = "Tags: " + postData.tags;
    postHeader.appendChild(tagsHolder);

    const likeButton = document.createElement("button");
    likeButton.classList.add('btn');
    likeButton.classList.add('btn-primary');
    likeButton.innerHTML = "High-Fives";
    const likesNumber = document.createElement("span");
    likesNumber.id = "likes-counter";
    likesNumber.classList.add('badge');
    likesNumber.classList.add('badge-light');

    var likeCount = postData.likes;
    likesNumber.innerHTML = likeCount;
    likeButton.appendChild(likesNumber);
    postHeader.appendChild(likeButton);

    likeButton.addEventListener("click", ()=>{
        likesNumber.innerHTML = ++likeCount;
        addLike(likeCount, index);
    })

    const top5list = document.createElement("ul");
    top5list.classList.add('list-group');
    top5list.classList.add('list-group-flush');
    div1.appendChild(top5list);

    for (var i=0; i<5; i++) {
        const item = document.createElement("li");
        item.classList.add('list-group-item');
        item.innerHTML = (i+1) + ". " + postData.items[i];
        top5list.appendChild(item);
    }

    const postButtonsDiv = document.createElement("div");

    const anchor = document.createElement("a");
    anchor.href = "add.html";

    const editPostButton = document.createElement("button");
    editPostButton.classList.add("btn");
    editPostButton.classList.add("btn-outline-primary");
    editPostButton.innerHTML="Edit";
    editPostButton.addEventListener("click", ()=> {
        localStorage.setItem('editIndex', index);
    })
    anchor.appendChild(editPostButton);

    const deletePostButton = document.createElement("button");
    deletePostButton.classList.add("btn");
    deletePostButton.classList.add("btn-outline-danger");
    deletePostButton.innerHTML="Delete Post";
    deletePostButton.addEventListener("click", ()=> {
        // TODO add confirmation popup
        deletePost(index);
    })
    postButtonsDiv.appendChild(anchor);
    postButtonsDiv.appendChild(deletePostButton);
    div1.appendChild(postButtonsDiv);

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
    // have to test this out
}