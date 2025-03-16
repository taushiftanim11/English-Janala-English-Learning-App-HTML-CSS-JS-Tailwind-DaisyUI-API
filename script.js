document.getElementById("login").addEventListener("click", function(event){
    event.preventDefault();
    const userId = document.getElementById("user-id").value;
    const password = document.getElementById("password").value;
    const convertedPassword = parseInt(password);

    if(userId.length > 0 && convertedPassword === 123456){
        alert("Login Successful")
        document.getElementById("header-s").style.display = "block";
        document.getElementById("learn-s").style.display = "block";
        document.getElementById("faq-s").style.display = "block";
        document.getElementById("hero").style.display = "none";
    } else {
        alert("User name or Password is Wrong")
    }
});
document.getElementById("logout").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("hero").style.display = "block";
    document.getElementById("header-s").style.display = "none";
    document.getElementById("learn-s").style.display = "none";
    document.getElementById("faq-s").style.display = "none";
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});



function loadLearnButtons(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data => displayButton(data.data)));
};
const loadLessonsByButtons = (level_no) => {
    document.getElementById("no-button-clicked").innerHTML = "";
    document.getElementById("lessons-container").innerHTML = "";
    const url =  `https://openapi.programming-hero.com/api/level/${level_no}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayLessons(data.data));
};
const loadLessonDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayModal(data.data));
}
function displayButton(data) {
    const learnButtonContainer = document.getElementById("learnButtonContainer");

    data.forEach((buttonName) => {
        const learnButtonDiv = document.createElement("div");
        learnButtonDiv.innerHTML = `
            <button id="${buttonName.id}" onclick="handleButtonClick(this, ${buttonName.level_no})" 
                class="navbtn btn btn-outline btn-primary f6 text-[14px]">
                <i id="book-icon" class="fa-solid fa-book-open"></i> ${buttonName.lessonName}
            </button>
        `;
        learnButtonContainer.append(learnButtonDiv);
    });
}
function handleButtonClick(button, level_no) {
    const allButtons = document.querySelectorAll('.navbtn');
    allButtons.forEach((btn) => {
        btn.style.backgroundColor = "white";
        btn.style.color = "#422AD5";
        document.getElementById("book-icon").style.color = "#422AD5";
    });
    
    button.style.backgroundColor = "#422AD5";
    button.style.color = "white";
    document.getElementById("book-icon").style.color = "white";
    
    loadLessonsByButtons(level_no);
}

const displayLessons = (data) => {
    const lessonsContainer = document.getElementById("lessons-container");
    const noLessonBlock = document.getElementById("no-lesson-block");
    if(data.length === 0){
        noLessonBlock.classList.remove("no-lesson-block"); 
    } else {
        noLessonBlock.classList.add("no-lesson-block"); 
        data.forEach((lesson) => {
            const lessonDiv = document.createElement("div");
            lessonDiv.innerHTML = `
                    <div class="bg-white p-[35px] rounded-[12px] w-[535px]">
                        <div class=" flex flex-col gap-y-[10px] mb-[70px] items-center">
                            <h4 class="text-[32px] f8">${lesson.word}</h4>
                            <span class="f5 text-[20px]">Meaning / Pronounciation</span>
                            <h5 class="ff6 text-[#464646] text-[32px]">"${lesson.meaning} / ${lesson.pronunciation}"</h5>
                        </div>
                        <div class="flex justify-between">
                            <button class="info w-[56px] h-[56px] rounded-[8px] bg-[#E8F4FF] flex justify-center items-center cursor-pointer" onclick="loadLessonDetails(${lesson.id})"><i class="fa-solid fa-circle-question text-[24px]"></i></button>
                            <a class="info w-[56px] h-[56px] rounded-[8px] bg-[#E8F4FF] flex justify-center items-center cursor-pointer">
                                <i class="fa-solid fa-volume-high text-[24px]"></i>
                            </a>
                        </div>
                    </div>
            `;
            lessonsContainer.append(lessonDiv);
        });
    }
};
const displayModal = (data) => {
    document.getElementById("my_modal").innerHTML = "";
    const modalContainer = document.getElementById("my_modal");
    document.getElementById("my_modal").showModal();
    const synonymButtons = data.synonyms.map((synonym) => {
        return `
            <button class="btn bg-[#EDF7FF]">${synonym}</button>
        `;
    }).join("");
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
        <div class="modal-box bg-[white] rounded-[16px] p-[24px]  w-[735px]">
            <div class="rounded-[16px] border-[2px] border-[#EDF7FF] p-[24px] flex flex-col gap-y-[32px]">
                <h4 class="f6 text-[36px]">
                    ${data.word} (<i class="fa-solid fa-microphone-lines text-[36px]"></i>: 
                        <span class="ff6 text-[36px]"> ${data.pronunciation}</span>)
                </h4>
                <div class="flex flex-col gap-y-[5px]">
                    <span class="text-[24px] f6">Meaning</span>
                    <span class="text-[20px] ff5">${data.meaning}</span>
                </div>
                <div class="flex flex-col gap-y-[5px]">
                    <span class="text-[24px] f6">Example</span>
                    <span class="text-[20px] f4">${data.sentence}</span>
                </div>
                <div class="flex flex-col gap-y-[5px]">
                    <span class="text-[24px] ff5">সমার্থক শব্দ গুলো</span>
                    <div class="flex gap-x-[10px] gap-y-[10px] flex-wrap">
                        ${synonymButtons}
                    </div>
                </div>
            </div>
            <form method="dialog">
                <button style="color: white" id="complete-learning" class="navbtn btn btn-primary f6 text-[14px] self-start mt-[24px] px-[24px] rounded-[16px]">Complete Learning</button>
            </form>
        </div>
    `;
    modalContainer.append(modalDiv);
};
loadLearnButtons();