interface Props {
  id: number;
  name: string;
  path: string;
  thumbnail: string;
}

const Games: Props[] = [
  {
    id: 1,
    name: "Valorant",
    path: "valorant",
    thumbnail: "/hero/valorant.jpg",
  },
  {
    id: 2,
    name: "League of Legends",
    path: "lol",
    thumbnail: "/hero/lol.jpg",
  },
  {
    id: 3,
    name: "Counter-Strike 2",
    path: "cs2",
    thumbnail: "/hero/cs2.jpg",
  },
];

export default Games;
