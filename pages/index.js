import Head from "next/head";

const RIDERS = [
  { name: "Anna Gasser", fileName: "AnnaGasser.jpg" },
  { name: "Austen Sweetin", fileName: "AustenSweetin.jpg" },
  { name: "Ben Ferguson", fileName: "BenFerguson.jpg" },
  { name: "Blake Paul", fileName: "BlakePaul.jpg" },
  { name: "Bode Merrill", fileName: "BodeMerrill.jpg" },
  { name: "Chris Rasman", fileName: "ChrisRasman.jpg" },
  { name: "Elena Hight", fileName: "ElenaHight.jpg" },
  { name: "Elias Elhardt", fileName: "EliasElhardt.jpg" },
  { name: "Eric Jackson", fileName: "EricJackson.jpg" },
  { name: "Gigi Ruf", fileName: "GigiRuf.jpg" },
  { name: "Hailey Langland", fileName: "HaileyLangland.jpg" },
  { name: "Hana Beaman", fileName: "HanaBeaman.jpg" },
  { name: "Jake Blauvelt", fileName: "JakeBlauvelt.jpg" },
  { name: "Jamie Anderson", fileName: "JamieAnderson.jpg" },
  { name: "Marion Haerty", fileName: "MarionHaerty.jpg" },
  { name: "Mark McMorris", fileName: "MarkMcMorris.jpg" },
  { name: "Mikkel Bang", fileName: "MikkelBang.jpg" },
  { name: "Nils Mindnich", fileName: "NilsMindnich.jpg" },
  { name: "Pat Moore", fileName: "PatMoore.jpg" },
  { name: "Robin VanGyn", fileName: "RobinVanGyn.jpg" },
  { name: "Sage Kotsenburg", fileName: "SageKotsenburg.jpg" },
  { name: "Travis Rice", fileName: "TravisRice.jpg" },
  { name: "Victor DeLaRue", fileName: "VictorDeLaRue.jpg" },
  { name: "Werni Stock", fileName: "WerniStock.jpg" },
];
const Home = () => (
  <div>
    {RIDERS.map(({ name, fileName }) => (
      <div key={fileName}>
        <img src={`/riders/${fileName}`} alt={name} />
        <p>{name}</p>
      </div>
    ))}
  </div>
);

export default Home;
