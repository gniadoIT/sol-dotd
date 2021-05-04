$(function(){

    fillDrivers(drivers);
    placeDrivers();

    connectToTwitch();

    setInterval(refreshResults, 1000);
    setTimeout(openVotings, prevote * 1000);
    setTimeout(presentDriver, timer*1000);
});

