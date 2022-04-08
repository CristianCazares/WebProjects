var isShowed = false;
function closed(){
    $("div.about_window").remove();
    isShowed = false;
}

function about(){
    if(isShowed){
        return;
    }
    $("div.main").append('<div class="about_window"></div>');
    $("div.about_window").append('<div class="toolbar"></div>');
    $("div.toolbar").append('<div style="padding-left:1vw">About</div>');
    $("div.toolbar").append('<button class="close" onclick="closed()">X</button>');
    $("div.about_window").append('<div class="about_content"></div>');
    $("div.about_content").append('<h2>Windows NT</h2>');
    $("div.about_content").append('<p>Windows NT is a proprietary graphical operating system produced by Microsoft, the first version of which was released on July 27, 1993. It is a processor-independent, multiprocessing and multi-user operating system.</p>');
    $("div.about_content").append('<p>"NT" stands for "New Technology"</p>');
    $("div.about_content").append('<h3>Origin</h3>');
    $("div.about_content").append('<p>Windows NT was an offshoot of Microsoft\'s joint development of the OS/2 operating system with IBM that started on <strong>1988</strong>. When the IBM/Microsoft partnership fell apart, IBM continued with OS/2, and Microsoft changed the name of its version of OS/2 to Windows NT.</p>');
    $("div.about_content").append('<button type="button" class="btn btn-secondary showTL" onclick="showTL()">Click to show Windows Time Line</button>');
    isShowed = true;
}

function showTL(){
    $("button.showTL").remove();
    $("div.about_content").append('<img src="https://www.xda-developers.com/files/2021/10/Windows-version-history-4.jpg" alt="Windows Timeline" style="height: clamp(20px, 30%, 200px)"></img>');
}