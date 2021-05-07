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
        hideVoting();
        loadPhoto();
        setWinnerName();
        setWinnerTeam();
        setWinnerPercents();
        showResults();
    }, 1000);
    setTimeout(function(){$("#all").fadeIn(500)}, presentDriverPause * 1000);

}

function hideVoting() {
    $("#voting").toggle();
}

function loadPhoto() {
    const xhr = new XMLHttpRequest();
    var url = "photos/" + removePolish(first.name.toLowerCase()) + ".png";
    xhr.onload = () => {
        if (xhr.status == 200) {
            $("#dotdPhoto").attr("src", url);
        }
    };
    xhr.open("HEAD", url);
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
    $("#results").toggle();
}

function removePolish(str){
    str = replace(str, "ą", "a");
    str = replace(str, "ć", "c");
    str = replace(str, "ę", "e");
    str = replace(str, "ł", "l");
    str = replace(str, "ó", "o");
    str = replace(str, "ń", "n");
    str = replace(str, "ś", "s");
    str = replace(str, "ż", "z");
    str = replace(str, "ź", "z");
    return str;
}

function replace(text, char, rep){
    return text.split(char).join(rep);
}