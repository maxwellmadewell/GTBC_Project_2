//*api-routes.js===================================================================================
//
//Notes:
//LeagueName(LeagueID) = NFL(4391), NBA(4387), MLB(4424), American Major League Soccer(4346)


// Requiring our models
const db = require("../models");
const axios = require("axios");

// Routes==========================================================================================
module.exports = function (app, anything) {


    //Get team info by name========================================================================
    app.get("/api/userplayers/:teamId", function (req, res) {
        const userTeamId = req.params.teamId
        const queryTeamPlayers = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${userTeamId}`
        axios.get(queryTeamPlayers).then(function (teamPlayers) {
            res.json(teamPlayers.data)
        });
    })

    app.get("/api/userteam/:teamId", function (req, res) {
        const userTeamId = req.params.teamId
        const queryTeamDetails = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${userTeamId}`
        axios.get(queryTeamDetails).then(function (teamDetails) {
            res.json(teamDetails.data)
        });

    })

    //Get all teams by league======================================================================
    app.get("/api/sport/:league", function (req, res) {
        const userLeague = req.params.league;
        const queryLeague = `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${userLeague}`;
        console.log(queryLeague);

        axios.get(queryLeague).then(function (league) {
            res.json(league.data);
        });
    });


    //Get team info by name========================================================================
    app.get("/api/team/:teamId", function (req, res) {
        const userTeamId = req.params.teamId;

        const queryTeam = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${userTeamId}`;

        axios.get(queryTeam).then(function (team) {
            res.json(team.data);
        });
    });


    //Get players by team name query===============================================================
    app.get("/api/team/:teamId/players", function (req, res) {
        const userTeamId = req.params.teamId
        const queryTeamPlayers = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${userTeamId}`
        axios.get(queryTeamPlayers).then(function (teamPlayers) {
            res.json(teamPlayers.data)
        });
    });

    //Get next 5 events by Team ID=================================================================
    app.get("/api/team/:teamId/nextevents", function (req, res) {
        const userTeamId = req.params.teamId;
        const queryTeamId = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${userTeamId}`;

        axios.get(queryTeamId).then(function (teamNext5) {
            res.json(teamNext5.data);
        });
    });

    //Get last 5 events by Team ID=================================================================
    app.get("/api/team/:teamId/lastevents/", function (req, res) {
        const userTeamId = req.params.teamId;
        const queryTeamId = `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${userTeamId}`;

        axios.get(queryTeamPlayers).then(function (teamLast5) {
            res.json(teamLast5.data);
        });
    });
    //Get next 15 events by League ID=================================================================
    app.get("/api/sport/:leagueId/nextevents", function (req, res) {
        const userLeagueId = req.params.leagueId;
        const queryLeagueId = `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${userLeagueId}`;

        axios.get(queryLeagueId).then(function (leagueNext15) {
            res.json(leagueNext15.data);
        });
    });
    //Get last 15 events by League ID=================================================================
    app.get("/api/sport/:leagueId/pastevents", function (req, res) {
        const userLeagueId = req.params.leagueId;
        const queryLeagueId = `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${userLeagueId}`;

        axios.get(queryLeagueId).then(function (leaguePastEvents) {
            res.json(leaguePastEvents.data);
        });
    });


    //Dynamic menu creation for createAccount.html page==============================================
    app.get("/api/sport/:leagueId/teams", function (req, res) {
        const leagueId = req.params.leagueId;
        db.Team.findAll({
            where: {
                league_id: leagueId
            }
        }).then(function (teamInfo) {
            res.json(teamInfo);
        })
    });


    app.get("/api/teams", function (req, res) {
        db.Team.findAll({
        }).then(function (teams) {
            res.json(teams);
        })
    });


    //Get all sports query=========================================================================
    app.get("/api/sports", function (req, res) {
        axios.get("https://www.thesportsdb.com/api/v1/json/1/all_sports.php#")
            .then(function (allTeams) {
                res.json(allTeams.data);
            });
    });

    app.get("/api/leagues", function (req, res) {
        axios.get("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4391").then(function (allTeams) {
            res.json(allTeams.data);
        });
    });

    app.post("/api/createUser", function (req, res) {
        db.Users.create(req.body).then(function (newUser) {
            res.json(newUser);
            console.log(newUser)
        })
    })

    app.get("/api/user/:id", function (req, res) {
        const userId = req.params.id;
        db.Users.findOne({
            where: {
                id: userId
            }
        }).then(function (userInfo) {
            console.log(userInfo)
            res.json(userInfo);
        })
    })

    app.post('/api/login', function (req, res) {
        let loginUsername = Object.keys(req.body)
        console.log(loginUsername[0])
        db.Users.findOne({
            where: {
              username: loginUsername[0]
            },
          }).then(function(dbUser) {
              console.log(dbUser)
            res.json(dbUser);
        })
        
        

    })
    app.get("/api/user/:league/:teamID/nextevents", function (req, res) {
        const teamId = req.params.teamID;
        const queryLeagueId = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${teamId}`;

        axios.get(queryLeagueId).then(function (leagueNext5) {
            res.json(leagueNext5.data);
        });
    });
}
