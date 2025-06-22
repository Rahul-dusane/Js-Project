function selectMark(selected ){
    document.querySelectorAll('.choice').forEach(btn => btn.classList.remove('active'));
    selected.classList.add('active');

    const sound = document.getElementById("selectAudio");
    if(sound){
        sound.currentTime = 0;
        sound.play().catch(e => {});
    }
}

function gameWithPlayer(){
    const selected = document.querySelector(".choice.active");

    if(!selected){
        alert("Please Select A Mark First....!");
        return ;
    }

    const sound = document.getElementById("startAudio");
    if(sound){
        sound.play().catch(e => {});
        sound.onended = function(){
            localStorage.setItem("selectMark",selected.textContent.trim());
            localStorage.removeItem("vsCPU");
            window.location.href = "/Home/home.html";
        };
    }else{
        localStorage.setItem("selectMark",selected.textContent.trim());
        localStorage.removeItem("vsCPU");
        window.location.href = "/Home/home.html";
    }

    /*localStorage.setItem("selectMark",selected.textContent.trim());
    setTimeout(() => {
         window.location.href = "/Home/home.html";
    }, 400);
    */ 
}

function gameWithCPU(){
    const selected = document.querySelector(".choice.active");

    if(!selected){
        alert("Please Select A Mark First...!");
        return ;
    }

    const sound = document.getElementById("startAudio");
    if(sound){
        sound.play().catch(e => {});
        sound.onended = function(){
            localStorage.setItem("selectMark",selected.textContent.trim());
            localStorage.setItem("vsCPU","true");
            window.location.href="/Home/home.html";
        };
    }else{
        localStorage.setItem("selectMark",selected.textContent.trim());
        localStorage.setItem("vsCPU","true");
        window.location.href="/Home/home.html";
    }
}