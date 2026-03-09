const verify=()=>{
    const user1 = getID('user');
    const pass1 = getID('pass');
    if(user1.value == "admin" && pass1.value ==  "admin123")  {
        
        window.location.assign("../main.html");
    }
    else  {
        alert('Username  or password is incorrect')
        return;
    }
    
}
const getID=(id)=>  {
    return  document.getElementById(id);
}
let allPosts = [];
const cardsAll=()=> {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => (res.json()))
    .then((data) => {
        allPosts = data.data;
        showAll(data.data);
    });
};
const showOpen = () => {
    const openPosts = allPosts.filter(post => post.status === "open");
    const p = document.getElementById('count');
    p.innerHTML = openPosts.length;
    showAll(openPosts);
};

const showClosed = () => {
    const closedPosts = allPosts.filter(post => post.status === "closed");
    const p = document.getElementById('count');
    p.innerHTML = closedPosts.length;
    showAll(closedPosts);
};

const showEverything = () => {
    const p = document.getElementById('count');
    p.innerHTML = allPosts.length;
    showAll(allPosts);
};

const modal=(id)=>  {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => showIndiWord(data.data));
};
// {
//   "status": "success",
//   "message": "Issue fetched successfully",
//   "data": {
//     "id": 33,
//     "title": "Add bulk operations support",
//     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
//     "status": "open",
//     "labels": [
//       "enhancement"
//     ],
//     "priority": "low",
//     "author": "bulk_barry",
//     "assignee": "",
//     "createdAt": "2024-02-02T10:00:00Z",
//     "updatedAt": "2024-02-02T10:00:00Z"
//   }
// }
const  showIndiWord=(data)=>  {
    const  myModal = document.getElementById('my_modal_5');
    myModal.innerHTML = `
        <div class="modal-box">
            <h1 class="text-3xl font-bold" >${data.title}</h1>
            <div class="flex items-center gap-2 ">
                <button class="btn rounded-3xl btn-secondary">${data.status}</button>
                 <p> by <span class="font-semibold"> ${data.author} </span> 22/06/26 </p>
            </div>
             <div class="flex gap-3 m-2">
             
                <div class="flex items-center bg-[#FEECEC] p-2 rounded-[16px] gap-2">
                    <h3><img src="./assets/bug.png" width="20px"></h3>
                    <p>${data.labels[0]}</p> 

                </div>

                <div class="flex items-center bg-[#FDE68A] p-2 rounded-[16px] gap-2">
                    <h3><img src="./assets/Aperture.png" width="20px"></h3>
                    <p>${data.labels[1]?data.labels[1]:""}</p> 
                </div>
            </div>
            <p class="text-[#64748B]">
                ${data.description}
            </p>
            <div class="flex justify-around">
                <div class="">
                    <p class="text-[#64748B]">Assignee:</p>
                    <p class="font-semibold">${data.author}</p>
                </div>
                <div class="">
                   <p class="text-[#64748B]">Priority :</p>
                    <p class="bg-amber-600 font-semibold text-center rounded-[15px] w-[100px]">${data.priority}</p>
                </div>
            </div>
            
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
            </form>
            </div>
        </div>
    `
}
const showAll=(posts)=> {
    const cardsBtn = document.getElementById('cards-btn');
    cardsBtn.innerHTML="";

    for(let post of posts) {
        const wordDiv = document.createElement('div');

        wordDiv.innerHTML = `
        <div onclick="my_modal_5.showModal(); modal(${post.id})" class="bg-amber-50 card p-3 gap-2 m-3 ">
            <div class="flex justify-between ">
                <img src="./assets/Open-Status.png" alt="">
                <button class="btn rounded-4xl bg-[#FEECEC] text-[#EF4444]">${post.priority}</button>
            </div>

            <h3 class="font-semibold">${post.title}</h3>
            <h3 class="font-normal text-[#64748B]">
                ${post.description}
            </h3>

            <div class="flex gap-3">
             
                <div class="flex items-center bg-[#FEECEC] p-2 rounded-[16px] gap-2">
                    <h3><img src="./assets/bug.png" width="20px"></h3>
                    <p>${post.labels[0]}</p> 

                </div>

                <div class="flex items-center bg-[#FDE68A] p-2 rounded-[16px] gap-2">
                    <h3><img src="./assets/Aperture.png" width="20px"></h3>
                    <p>${post.labels[1]?post.labels[1]:""}</p> 
                </div>
            </div>

            <div class="my-2">
                <h1 class="text-[#64748B]">#1 ${post.author}</h1>
                <h1 class="text-[#64748B]">1/15/2024</h1>
            </div>
        </div>
        `;

        cardsBtn.appendChild(wordDiv);  
    }
};
cardsAll();