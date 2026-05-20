export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: number;
  excerpt: string;
  body: string[];  // each string is a paragraph
}

export const ARTICLES: Article[] = [
  {
    id: 'france-favorites-2026',
    title: 'Why France Are the Clear Favorites for 2026',
    subtitle: 'Mbappé, depth, and a coach playing his final hand',
    category: 'Analysis',
    date: 'May 20, 2026',
    readTime: 5,
    excerpt: 'With Kylian Mbappé at the peak of his powers and a squad of unmatched depth, France head into the 2026 World Cup as the team everyone else must beat.',
    body: [
      'Every four years, one team carries the weight of expectation more than any other. In 2026, that team is France. Les Bleus arrive in North America with a squad so deep, so technically gifted, and so battle-hardened that dismissing them borders on delusion.',
      'At the center of everything is Kylian Mbappé. Now 27 and in the prime of his career at Real Madrid, Mbappé has evolved beyond the raw electric teenager who burst onto the world stage in Russia 2018. He is now a complete footballer — a leader, a captain, and the most feared attacker on the planet. His 56 international goals already rank him second in French scoring history, and he has never looked sharper.',
      'But France\'s strength goes far beyond one player. The squad Didier Deschamps has assembled for what he has confirmed will be his final tournament is arguably the most balanced of his tenure. The return of N\'Golo Kanté brings elite defensive midfield coverage. Warren Zaïre-Emery, just 20, provides dynamism and energy. Ousmane Dembélé has arguably never played better football than he did in PSG\'s 2024-25 Champions League campaign.',
      'Defensively, France are equally formidable. William Saliba is now one of the best central defenders in world football. Theo Hernandez provides an attacking threat from left back that few nations can match. Jules Koundé is relentless on the right. And behind them, Mike Maignan has grown into one of Europe\'s elite goalkeepers.',
      'The question is not whether France have the talent to win this tournament. They clearly do. The question is whether Deschamps can harness it — whether 26 world-class egos can subordinate individual ambition to collective purpose for a month in the heat of North American summer. He has done it before. He won the World Cup as a player in 1998 and as a manager in 2018. This is his final shot at an unprecedented treble of World Cup triumphs.',
      'For every other team in the tournament, France are the standard. Beat France, and you\'ve beaten the best. For now, until proven otherwise, they are the favorites — and they know it.',
    ],
  },
  {
    id: 'neymar-comeback-brazil',
    title: 'Neymar\'s Return: The Wild Card That Could Define Brazil\'s World Cup',
    subtitle: 'At 34 and back at Santos, can he still turn it on when it matters most?',
    category: 'Feature',
    date: 'May 19, 2026',
    readTime: 5,
    excerpt: 'Brazil\'s all-time leading scorer has defied expectations by making it to a fourth World Cup. Whether he can impact it is the tournament\'s most compelling subplot.',
    body: [
      'Nobody wrote the script for this. After two devastating ACL injuries in two years, after Al-Hilal, after the tears, the surgeries, and the rehabilitation, Neymar is back. Not at a Paris café announcing his retirement. Not at a press conference confirming what everyone feared. He is in Carlo Ancelotti\'s Brazil squad, headed to a World Cup on home-adjacent soil, ready to write one final chapter.',
      'At 34, Neymar is not the same player who dazzled at Barcelona or orchestrated Brazil\'s 2016 Olympic gold on home soil in Rio. The electric dribbling is slightly less electric. The recovery time is longer. The injury risk never fully disappears. But the genius — the vision, the technique, the ability to produce something no one else can in the defining moment of a match — that has never left him.',
      'His numbers tell the story of a generational talent: 79 international goals in 128 appearances, Brazil\'s all-time top scorer by a distance. Even last season at Santos, returning to the club where it all began, he reminded anyone who needed reminding that his football brain is still operating at the highest level.',
      'The challenge for Ancelotti is how to use him. Brazil have Vinícius Júnior as their primary attacking weapon, Raphinha as a consistent creator, and a roster full of dynamic forwards. Neymar is not a starter in the traditional sense anymore — he is a weapon to be deployed, a match-changer, a player opponents cannot simply ignore.',
      'What Brazil are gambling on is the Neymar factor: that in a knockout match, when the tournament is on the line, there is still no one on the planet who can produce the unexpected quite like him. A free kick, a moment of individual brilliance, a penalty — these are the things that decide World Cups, and Neymar has built his career on delivering exactly these.',
      'Whether this gamble pays off is the most compelling subplot of the 2026 World Cup. It is a story about legacy, about resilience, and about whether football\'s great entertainers ever truly lose what makes them special. The tournament is richer for his presence. The outcome will determine his final place in history.',
    ],
  },
  {
    id: '48-team-format-explained',
    title: 'The 48-Team World Cup: How the Expanded Format Changes Everything',
    subtitle: 'More nations, more matches, and a fundamentally different tournament',
    category: 'Explainer',
    date: 'May 18, 2026',
    readTime: 4,
    excerpt: 'For the first time ever, 48 nations compete for the World Cup. Here\'s what that means for the tournament structure, the smaller nations, and the fans.',
    body: [
      'The 2026 FIFA World Cup is unlike any that came before it. For the first time in the tournament\'s 96-year history, 48 nations will compete — up from 32 at Qatar 2022. It\'s the most significant structural change to the World Cup since the field was expanded from 24 to 32 teams ahead of France 1998, and it reshapes the tournament in ways that are still becoming clear.',
      'The format works like this: 48 teams are divided into 16 groups of three. The top two from each group advance to a Round of 32 — a stage that has never existed before — and from there the tournament proceeds through the Round of 16, quarter-finals, semi-finals, and the final.',
      'For the smaller footballing nations, the expansion is nothing short of revolutionary. Countries that previously had no realistic path to the World Cup — nations from the Pacific, from Central America, from emerging African footballing cultures — now have a genuine seat at the table. Uzbekistan, playing their first ever World Cup, would not be here under the old format. Neither would several of the CONCACAF nations that have qualified.',
      'The criticism of the expanded format centers on dilution. With 16 groups of three, critics argue that the group stage will feature more mismatches and that the quality gap between the top seeds and the weakest nations will be more visible than ever. There is also the question of the third-place finishers: four of the best third-placed teams advance, creating a complex qualification scenario that can lead to mathematical complications late in the group stage.',
      'But the counterargument is compelling: the World Cup has always been about more than just the elite. It is about the world — about football\'s reach across cultures, languages, and continents. A 48-team tournament is a more honest reflection of that global game. And in a three-team group, every match matters. There are no dead rubbers. Every game is high-stakes from kickoff.',
      'The 2026 tournament is also the first co-hosted by three countries — the United States, Canada, and Mexico — spread across 16 cities and 16 stadiums. The sheer geographic scale of this World Cup is unprecedented, adding a logistical complexity that the expanded team count only amplifies. How it all comes together will define whether the 48-team format is the future of the tournament, or an experiment that forces a rethink.',
    ],
  },
  {
    id: 'usa-home-advantage',
    title: 'USA 2026: Can the Host Nation Finally Deliver on Home Soil?',
    subtitle: 'Pochettino\'s squad has more talent than any previous USMNT generation — the pressure is on',
    category: 'Analysis',
    date: 'May 17, 2026',
    readTime: 4,
    excerpt: 'The United States has never won the World Cup, but they\'ve never hosted it with a squad this talented. Under Mauricio Pochettino, expectations have never been higher.',
    body: [
      'In 1994, the United States hosted the World Cup and made the Round of 16. Thirty-two years later, they are hosting it again — and the expectation is considerably higher. The difference is the players. The 1994 squad had Tony Meola and Tab Ramos. The 2026 squad has Christian Pulisic, Weston McKennie, Yunus Musah, and a generation of Americans raised in the elite academies of Europe\'s top clubs.',
      'Mauricio Pochettino\'s appointment as head coach was a statement of intent. The Argentine, who built Tottenham Hotspur into a Champions League finalist and managed PSG and Chelsea at the highest European level, was not hired to oversee steady progress. He was hired to compete. He was hired to make a run.',
      'The USMNT roster reflects the transformation of American soccer over the past decade. Christian Pulisic is one of the Premier League\'s most dynamic attacking midfielders at Chelsea. Weston McKennie plays regularly in Serie A. Yunus Musah was a starter at AC Milan at 22. These are not players filling out a roster — they are genuine quality at the elite level of the club game.',
      'The home advantage factor cannot be overstated. World Cup hosts have historically outperformed their seeding — France 1998, Korea 2002, Germany 2006, Brazil 2014 all produced remarkable host nation runs. The crowd effect, the reduced travel, the familiarity of conditions — these things matter. American stadiums will be packed and electric for USMNT matches in a way that simply doesn\'t happen at away tournaments.',
      'The realistic target for this USMNT generation is the quarter-finals, minimum. A semi-final appearance would be a seismic moment for American soccer. And in a 48-team expanded tournament where upsets are more likely and the bracket more open than ever, the outer reaches of possibility — a World Cup final on American soil — are not beyond imagination.',
      'The pressure is enormous. American sports fans have limited patience for "good effort" narratives at home tournaments. Pochettino knows this. His players know this. The question is whether they have the experience, the composure, and the collective quality to handle that pressure when the knockout rounds arrive and the margin for error disappears.',
    ],
  },
  {
    id: 'morocco-africa-hope',
    title: 'Morocco\'s Quest to Make History Twice',
    subtitle: 'After their miraculous 2022 run, Regragui\'s Atlas Lions arrive in 2026 as Africa\'s great hope',
    category: 'Feature',
    date: 'May 16, 2026',
    readTime: 4,
    excerpt: 'Morocco stunned the world in Qatar by reaching the semi-finals. Now, with the same coach and a more experienced squad, they want to go further.',
    body: [
      'Four years ago, Morocco did something no African nation had ever done. They won their group ahead of Croatia and Belgium. They beat Spain on penalties. They beat Portugal with their greatest ever player still on the pitch. They walked off the field in Qatar as the most remarkable team of the tournament — a fourth-place finish that felt like a beginning rather than an end.',
      'It was a beginning. Walid Regragui, the coach who masterminded that historic run, has stayed, rebuilt, and evolved. The spine remains — Yassine Bounou in goal, Achraf Hakimi bombing down the right flank, Sofyan Amrabat in midfield, Youssef En-Nesyri leading the attack. But four years of experience, of Champions League football, of Europa League campaigns, have sharpened every component.',
      'The key to Regragui\'s Morocco is their defensive identity. They are extraordinarily difficult to score against — compact, physically imposing, and disciplined in a way that reflects the tactical sophistication of their coach. When opponents have the ball against Morocco, they consistently find fewer spaces than they anticipated. The pressing triggers are set. The shape is maintained. And when Morocco win the ball back, the transition speed is devastating.',
      'Hakimi at right back might be the single most important player outside the obvious superstars at this tournament. His ability to function as an extra forward in attack while maintaining defensive responsibility is central to everything Morocco do. PSG\'s most creative force for three years, he arrives at the 2026 World Cup in the form of his life.',
      'Morocco are in a World Cup group that is genuinely challenging, but Regragui\'s squad has proven they can beat anybody on their day. The difference in 2026 is that no one is surprised by them anymore. The element of shock is gone. What replaces it is respect — and the knowledge that this team is built for exactly the tournament they are about to play.',
      'Africa has never produced a World Cup winner. Morocco\'s dream, articulated by their players and their coach with striking openness, is to be the first. The 2022 run proved they could compete with the world\'s best. The 2026 campaign will test whether they can sustain it for seven matches rather than five.',
    ],
  },
  {
    id: 'ronaldo-final-world-cup',
    title: 'Cristiano Ronaldo at 41: The World Cup\'s Most Extraordinary Story',
    subtitle: 'His sixth World Cup defies biology, logic, and the limits of what sport allows',
    category: 'Feature',
    date: 'May 15, 2026',
    readTime: 5,
    excerpt: 'No one in football history has competed at six World Cups. Ronaldo has. What drives him, what he\'s chasing, and whether Portugal can deliver the one trophy he\'s never won.',
    body: [
      'The numbers are almost obscene. Six World Cups. 213 international appearances. 130 international goals — a record that may stand for a generation. Cristiano Ronaldo is 41 years old, and he is going to the 2026 FIFA World Cup. This is not sentiment. This is not charity. He earned his place in Roberto Martínez\'s squad because he is still, at an age when most footballers have long retired, a player of consequence.',
      'No player in the history of the sport has competed at six World Cups. Lothar Matthäus appeared at five tournaments for Germany. Ronaldo has surpassed even that, defying every biological expectation about what the body of an elite footballer can sustain at this age.',
      'The goal — the one that has driven every decision in his career for the last decade — is the World Cup. Ronaldo has won almost everything else. He has five Ballon d\'Or awards and a record eight overall (he won three more between 2022 and 2024). He has Champions League titles with Manchester United and Real Madrid. He has the European Championship with Portugal in 2016. But the World Cup, the one tournament that would complete the argument, has always eluded him.',
      'In Qatar 2022, Portugal\'s run ended in the quarter-finals against Morocco, and Ronaldo\'s tears at full time were some of the most affecting images of that tournament. He was dropped to the bench for the knockout rounds, a decision that Martínez controversially reversed — and then had to live with after Portugal\'s elimination.',
      'In 2026, Martínez faces the same challenge. Portugal have extraordinary attacking depth without Ronaldo — Bruno Fernandes, Bernardo Silva, Rafael Leão, Pedro Neto, and a clutch of young talents who collectively represent the most exciting generation Portugal has produced. Managing Ronaldo\'s minutes, managing his ego, and managing the team\'s cohesion around him is the most delicate balancing act in European football.',
      'But dismissing him is a mistake. At Al-Nassr, Ronaldo has continued to score at a pace that would be remarkable for a player ten years younger. His set-piece delivery, his positioning in the penalty box, his leadership in the dressing room — these are things that cannot be replicated by someone younger and faster. Ronaldo at 41 is not Ronaldo at 25. But he remains, uniquely, Ronaldo.',
      'Whether Portugal can win the World Cup with him, or without him, or somewhere in between — that is the question that will define this tournament for 10 million Portuguese people who have waited their entire lives for this answer.',
    ],
  },
];
