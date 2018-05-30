function dateToString(date) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    }
    return  yyyy + mm + dd;
}


function teamsToString(teams) {
    for (var i = 0; i < teams.length; i++) {
        if (i == 0) {
            var teams_str = teams[i].abbreviation;
        }
        else {
            teams_str = teams_str + ',' + teams[i].abbreviation;
        }
    }
    return teams_str
}

export {
    dateToString, 
    teamsToString
}