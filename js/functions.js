function fillDrivers(drivers) {
    names.forEach(function (name, index) {
        names = name.split(" ");
        drivers[index] = {fName: names[0], name: names[1], points: 0, proc: 0, team: names[2]};
    });
}

function placeDrivers(){
    first = drivers[0];
    second = drivers[1];
    third = drivers[2];
}

function connectToTwitch(){
    const client = new tmi.Client({channels: [channelName]});
    client.connect();
    client.on('message', listenForVotes);
}

function listenForVotes(channel, tags, message, self){
    var vote = message;
    var person = tags['display-name'];

    console.log(person + " is voting for " + vote);
    if (map[person] == null || map[person] === undefined){
        if (addPointToDriver(vote) == true){
            console.log(person + "'s vote stored");
            map[person] = vote;
        }
    } else {
        console.log(person + " already voted");
    }

    drivers.sort(function(a, b){
        return b.points - a.points;
    });

    placeDrivers();

}

function addPointToDriver(driver){
    var retVal = false;
    drivers.forEach(function(storedDriver){
        if (removePolish(storedDriver.name.toLowerCase()) === removePolish(driver.toLowerCase())){
            console.log("adding point to " + storedDriver.name);
            storedDriver.points += 1;
            allVotes += 1;
            drivers.forEach(function(driver) {
                driver.proc = Math.round((driver.points / allVotes) * 100);
            });
            retVal = true;
        }
    });
    return retVal;
}

function refreshResults(){
    $("#fName").text(first.name);
    $("#first").find(".percentage").text(first.proc).append("%");
    $("#sName").text(second.name);
    $("#second").find(".percentage").text(second.proc).append("%");
    $("#tName").text(third.name);
    $("#third").find(".percentage").text(third.proc).append("%");
}

function openVotings(){
    $("#all").fadeOut(500);
    setTimeout(function(){
    $("#prevote").toggle();
    $("#voting").toggle();}, 1000);
    setTimeout(function(){$("#all").fadeIn(500)}, voteStartPause*1000);
}

function presentDriver(){
    $("#all").fadeOut(500);
    setTimeout(function() {
        $("#voting").toggle();
        loadPhoto();
        setWinnerName();
        setWinnerTeam();
        setWinnerPercents();
        $("#results").toggle();
    }, 1000);
    setTimeout(function(){$("#all").fadeIn(500)}, presentDriverPause * 1000);

}

function hideVoting() {
    $("#voting").fadeOut();
}

function loadPhoto() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status == 200) {
            $("#dotdPhoto").attr("src", "photos/" + first.name.toLowerCase() + ".png");
        }
    };
    xhr.open("HEAD", "photos/" + first.name.toLowerCase() + ".png");
    xhr.send();
}

function setWinnerName() {
    $("#nameSurname").text(first.fName).append("<br />").append(first.name);
}

function setWinnerTeam() {
    $("#rectangle").attr("class", first.team);
}

function setWinnerPercents() {
    $("#percents").text(first.proc).append("%");
}

function showResults() {
    $("#results").fadeIn();
}

function removePolish(str){
    str = str.replaceAll("ą", "a");
    str = str.replaceAll("ć", "c");
    str = str.replaceAll("ę", "e");
    str = str.replaceAll("ł", "l");
    str = str.replaceAll("ó", "o");
    str = str.replaceAll("ń", "n");
    str = str.replaceAll("ś", "s");
    str = str.replaceAll("ż", "z");
    str = str.replaceAll("ź", "z");
    return str;
}