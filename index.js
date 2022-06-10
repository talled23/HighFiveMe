console.log(localStorage.getItem("prevItems"))
var postList = JSON.parse(localStorage.getItem("prevItems"));
console.log(postList);

if (postList != null) {
    for(var i=0; i<postList.length; i++){
        console.log(i);
        makeNewPost(postList[i])
    }
    
}

function makeNewPost(postData) {
    // later: add id to these elements for CSS purposes
    console.log("entered makeNewPost: "+ postData);
    const element = document.createElement("li");
    element.classList.add('list-group-item');
    element.classList.add('my-5');

    const div1 = document.createElement("div");
    div1.classList.add('card');
    div1.style.width = '18rem';
    element.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add('card-header');
    div2.innerHTML = "Top 5 " + postData.title;
    div1.appendChild(div2);

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
    

    document.querySelector('ul').appendChild(element);
}