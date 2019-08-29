//*api-routes.js===================================================================================
//
//Notes:
//LeagueName(LeagueID) = NFL(4391), NBA(4387), MLB(4424), American Major League Soccer(4346)


// Requiring our models
const db = require("../models");
const axios = require("axios");

// Routes==========================================================================================
module.exports = function (app, anything) {


    //Get all teams by league======================================================================
    app.get("/api/:league", function (req, res) {
        const userLeague = req.params.league;
        const queryLeague = `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${userLeague}`;
        console.log(queryLeague);

        axios.get(queryLeague).then(function (league) {
            console.log
            res.json(league.data);
        });
    });
    //teams[i].idTeam
    //teams[i].strTeam

    //Get team info by name========================================================================
    app.get("/api/:team", function (req, res) {
        const userTeamName = req.params.team;
        const queryTeam = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${userTeamName}`;

        axios.get(queryTeam).then(function (team) {
            res.json(team.data);
        });
    });
    //team[1].idTeam - team id
    //team[1].strTeam - team name
    //team[1].strSport - sport anem


    //Get players by team name query===============================================================
    app.get("/api/players/:team", function (req, res) {
        const userTeam = req.params.team;
        const queryTeamPlayers = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${userTeam}`;

        axios.get(queryTeamPlayers).then(function (teamPlayers) {
            res.json(TeamPlayers.data);
        });
    });

    //Get next 5 events by Team ID=================================================================
    app.get("/api/teamNext5Events/:teamId", function (req, res) {
        const userTeamId = req.params.teamId;
        const queryTeamId = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${userTeamId}`;

        axios.get(queryTeamId).then(function (teamNext5) {
            res.json(teamNext5.data);
        });
    });

    //Get last 5 events by Team ID=================================================================
    app.get("/api/teamLast5Events/:teamId", function (req, res) {
        const userTeamId = req.params.teamId;
        const queryTeamId = `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${userTeamId}`;

        axios.get(queryTeamPlayers).then(function (teamLast5) {
            res.json(teamLast5.data);
        });
    });

    //Get next 15 events by League ID=================================================================
    app.get("/api/leagueNext15Events/:leagueId", function (req, res) {
        const userLeagueId = req.params.leagueId;
        const queryLeagueId = `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${userLeagueId}`;

        axios.get(queryLeagueId).then(function (leagueNext15) {
            res.json(leagueNext15.data);
        });
    });

    //Get all sports query=========================================================================
    app.get("/api/sports", function (req, res) {
        axios.get("https://www.thesportsdb.com/api/v1/json/1/all_sports.php#")
            .then(function (allTeams) {
                res.json(allTeams.data);
            });
    });
    //sports[i].idSport for i=0 to length
    //sports[i].strSport for i=0 to length

    //Get all leagues query========================================================================
    app.get("/api/leagues", function (req, res) {
        axios.get("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php").then(function (allLeagues) {
            res.json(allLeagues.data);
        });
    });
    //leagues[i].idLeague for i=0 to length
    //leagues[i].strLeague for i=0 to length
};
