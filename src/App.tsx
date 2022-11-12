import { useEffect, useState } from "react";
import Modal from "react-modal";
import { XMLParser } from "fast-xml-parser";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

const parser = new XMLParser({
  ignoreAttributes: false,
});

export default function App() {
  const [modal, setModal] = useState(false);
  const [insult, setInsult] = useState("");

  useEffect(() => {
    updateDirtyWord();

    setTimeout(() => {
      const pwreset = document.getElementById("pwreset");

      if (!pwreset) return;

      pwreset.style.transition = "all 0.5s ease-in-out";
      pwreset.style.transform = "scale(1.1)";
      setTimeout(() => {
        pwreset.style.transform = "scale(1)";
      }, 500);
    }, 5000);
  }, []);

  async function getDirtyWords() {
    const response = await fetch(
      "https://raw.githubusercontent.com/skidoodle/ekreta-src/5df57984a47210cb689dc8ef11f5340c63c8beb4/KretaWeb/Resources/DirtyWords.xml"
    );
    const data = await response.text();
    return data;
  }

  async function updateDirtyWord() {
    const dirtyWordsText = await getDirtyWords();
    const dirtyWords = parser.parse(dirtyWordsText).DirtyWords.Word;

    const insultLevel = weightedRandom();

    let insult = "";
    for (let i = 0; i < insultLevel; i++) {
      insult +=
        dirtyWords[
          Math.floor(Math.random() * dirtyWords.length)
        ].toLowerCase() + " ";

      setInsult(insult);
    }
  }

  function weightedRandom() {
    const random = Math.random();
    const weight = 0.5;
    return Math.ceil(Math.log(random) / Math.log(1 - weight));
  }

  return (
    <div>
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[37.5rem]">
        <img className="m-auto" src="logo.png" alt="e-kreten logo" />

        <div className="relative bg-kreta-light-blue rounded-t-md h-max text-xl text-white font-medium mt-8 p-4 pr-8">
          Mi van te kis <span className="font-bold inline">{insult}</span>?
          <button className="absolute right-4 top-5" onClick={updateDirtyWord}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="bg-white p-4">
          Kérjük adja meg az intézményi KRETÉN felhasználónevét és jelszavát,
          amennyiben elfelejtette, keresse meg valamelyik publikus adatbázisban
        </div>

        <div className="bg-white p-4 pt-0">
          Tisztelt{" "}
          <span className="text-kreta-light-blue">
            József') DROP TABLE Tanulo
          </span>
          {", "}
          technikai okok miatt, a rendszergazdák kérésére NE lépjen be a
          rendszerbe
        </div>

        <div className="bg-white p-4 rounded-b-md">
          <input
            className="border border-gray-300 bg-gray-200 rounded-md p-2 w-full mb-3"
            type="text"
            placeholder="Felhasználónév"
            disabled={true}
          />
          <input
            className="border border-gray-300 bg-gray-200 rounded-md p-2 w-full mb-3"
            type="text"
            placeholder="Jelszó"
            disabled={true}
          />

          <div className="flex justify-between">
            <button
              id="pwreset"
              className="text-blue-800 underline"
              onClick={() => {
                setModal(true);
              }}
            >
              Elfelejtettem a jelszavam
            </button>

            <button
              className="bg-kreta-light-blue text-white rounded-md p-2"
              disabled={true}
            >
              Bejelentkezés
            </button>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-white text-sm">
        Készült 🍊 megbízásából, 12 Mrd ft közpénzből
      </div>

      <Modal
        isOpen={modal}
        shouldCloseOnOverlayClick={true}
        style={modalStyles}
      >
        <div className="font-bolt text-xl mb-2">
          Legújabb fejlesztéseinknek hála többé{" "}
          <span className="text-kreta-light-blue">nem kell megjegyeznie</span> a
          jelszavát!
        </div>
        <div>
          Minden adatát, tehát nevét, lakhelyét, személyi- és
          diákigazolványszámát, stb...,{" "}
          <span className="text-kreta-light-blue">publikusan elérhetővé</span>{" "}
          tettük, hogy többé ne kelljen megjegyeznie őket.
        </div>

        <div className="mt-4">
          Ösztöndíjasok figyelem! Megbecsülésünk jeléül a banki adataikat is
          nyilvánosságra hoztuk
        </div>

        <button
          onClick={() => {
            setModal(false);
          }}
          className="bg-kreta-light-blue text-white rounded-md p-2 mt-4"
        >
          Fasza!
        </button>
      </Modal>
    </div>
  );
}
