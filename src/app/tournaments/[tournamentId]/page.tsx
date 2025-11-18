import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Trophy, Calendar, Users, Crown, Home, ArrowLeft, Award, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const TournamentDetails = () => {
    const tournament = {
        title: "Autumn Championship 2024",
        date: "November 10, 2024",
        winner: "Purple",
        prize: "500 GEL",
        participants: 32,
        format: "1v1 Single Elimination",
        map: "Arabia",
    };

    const finalBracket = [
        { round: "Grand Final", player1: "Purple", score1: 3, player2: "Sandriko", score2: 1 },
    ];

    const semiFinals = [
        { round: "Semi-Final 1", player1: "Purple", score1: 3, player2: "Lucipher", score2: 0 },
        { round: "Semi-Final 2", player1: "Sandriko", score1: 3, player2: "zv", score2: 2 },
    ];

    const quarterFinals = [
        { round: "Quarter-Final 1", player1: "Purple", score1: 2, player2: "Sandro_Monk", score2: 0 },
        { round: "Quarter-Final 2", player1: "zv", score1: 2, player2: "Archer", score2: 1 },
        { round: "Quarter-Final 3", player1: "Lucipher", score1: 2, player2: "guramata", score2: 0 },
        { round: "Quarter-Final 4", player1: "sandriko", score1: 2, player2: "omerta", score2: 1 },
    ];

    const topParticipants = [
        { rank: 1, player: "Purple", prize: "300 GEL", civ: "Mongols", winRate: "87.5%" },
        { rank: 2, player: "sandriko", prize: "150 GEL", civ: "Britons", winRate: "75.0%" },
        { rank: 3, player: "Lucipher", prize: "50 GEL", civ: "Franks", winRate: "66.7%" },
        { rank: 4, player: "zv", prize: "-", civ: "Byzantines", winRate: "62.5%" },
    ];

    const allMatches = [
        { round: "Round 1", player1: "Giorgi_TheKing", score1: 2, player2: "Vano_Castle", score2: 0, map: "Arabia" },
        { round: "Round 1", player1: "Sandro_Monk", score1: 2, player2: "Giga_Hussar", score2: 1, map: "Arena" },
        { round: "Round 2", player1: "Giorgi_TheKing", score1: 2, player2: "Sandro_Monk", score2: 0, map: "Arabia" },
        { round: "Semi-Final", player1: "Giorgi_TheKing", score1: 3, player2: "Dato_Cavalry", score2: 0, map: "Arabia" },
        { round: "Grand Final", player1: "Giorgi_TheKing", score1: 3, player2: "Nika_Warrior", score2: 1, map: "Arabia" },
    ];

    const MatchCard = ({ match }: { match: any }) => (
        <Card className="hover:border-primary/50 transition-all">
            <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <p className={`font-bold text-lg ${match.score1 > match.score2 ? 'text-primary' : 'text-muted-foreground'}`}>
                                {match.player1}
                            </p>
                            <Badge variant={match.score1 > match.score2 ? "default" : "outline"}>
                                {match.score1}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className={`font-bold text-lg ${match.score2 > match.score1 ? 'text-primary' : 'text-muted-foreground'}`}>
                                {match.player2}
                            </p>
                            <Badge variant={match.score2 > match.score1 ? "default" : "outline"}>
                                {match.score2}
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge variant="secondary" className="mb-2">{match.round}</Badge>
                        {match.map && <p className="text-sm text-muted-foreground">Map: {match.map}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header with Navigation */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
                    <Link href="/public" className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors">
                        <Crown className="w-6 h-6" />
                        Georgian AoE II
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/tournaments">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Tournaments
                            </Button>
                        </Link>
                        <Link href="/public">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Home className="w-4 h-4" />
                                Home
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Tournament Header */}
            <section className="py-12 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-10 h-10 text-primary" />
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{tournament.title}</h1>
                            </div>
                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {tournament.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    {tournament.participants} Players
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4" />
                                    {tournament.format}
                                </div>
                            </div>
                        </div>
                        <Card className="border-2 border-accent/50 bg-accent/5">
                            <CardContent className="pt-6 text-center">
                                <Crown className="w-8 h-8 text-accent mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">Champion</p>
                                <p className="text-2xl font-bold text-accent">{tournament.winner}</p>
                                <p className="text-sm text-muted-foreground mt-2">Prize: {tournament.prize}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Tournament Details Tabs */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Tabs defaultValue="bracket" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="bracket">Bracket</TabsTrigger>
                            <TabsTrigger value="standings">Final Standings</TabsTrigger>
                            <TabsTrigger value="matches">All Matches</TabsTrigger>
                        </TabsList>

                        <TabsContent value="bracket" className="space-y-8">
                            {/* Grand Final */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-primary" />
                                    Grand Final
                                </h3>
                                <div className="max-w-2xl">
                                    {finalBracket.map((match, index) => (
                                        <MatchCard key={index} match={match} />
                                    ))}
                                </div>
                            </div>

                            {/* Semi Finals */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Semi-Finals</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {semiFinals.map((match, index) => (
                                        <MatchCard key={index} match={match} />
                                    ))}
                                </div>
                            </div>

                            {/* Quarter Finals */}
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Quarter-Finals</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {quarterFinals.map((match, index) => (
                                        <MatchCard key={index} match={match} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="standings">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="w-6 h-6 text-primary" />
                                        Final Standings
                                    </CardTitle>
                                    <CardDescription>Top 4 players and their performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {topParticipants.map((participant, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                            ${participant.rank === 1 ? 'bg-accent/20 text-accent' :
                                                        participant.rank === 2 ? 'bg-secondary/20 text-secondary' :
                                                            participant.rank === 3 ? 'bg-primary/20 text-primary' :
                                                                'bg-muted text-muted-foreground'}`}>
                                                        {participant.rank}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg">{participant.player}</p>
                                                        <p className="text-sm text-muted-foreground">Favorite: {participant.civ}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-secondary">{participant.prize}</p>
                                                    <p className="text-sm text-muted-foreground">Win Rate: {participant.winRate}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="matches">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold mb-4">Match History</h3>
                                {allMatches.map((match, index) => (
                                    <MatchCard key={index} match={match} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Tournament Stats */}
            <section className="py-12 px-4 bg-muted/50">
                <div className="container mx-auto max-w-6xl">
                    <h3 className="text-3xl font-bold mb-8 text-center">Tournament Statistics</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-4xl font-bold text-primary mb-2">32</p>
                                <p className="text-muted-foreground">Total Players</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-4xl font-bold text-secondary mb-2">31</p>
                                <p className="text-muted-foreground">Matches Played</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-4xl font-bold text-accent mb-2">500</p>
                                <p className="text-muted-foreground">Prize Pool (GEL)</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-4xl font-bold text-primary mb-2">8h</p>
                                <p className="text-muted-foreground">Duration</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-4">
                <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
                    <p>© 2024 Georgian AoE II Community. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TournamentDetails;
