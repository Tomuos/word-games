import React from 'react';

function jumbleWord(word) {
    let shuffledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffledWord;
}

const words = [
    {
        word: "badge",
        jumbled: jumbleWord("badge"),
        audio: "path_to_badge_audio.mp3"
    },
    {
        word: "edge",
        jumbled: jumbleWord("edge"),
        audio: "path_to_edge_audio.mp3"
    },
    {
        word: "bridge",
        jumbled: jumbleWord("bridge"),
        audio: "path_to_bridge_audio.mp3"
    },
    {
        word: "dodge",
        jumbled: jumbleWord("dodge"),
        audio: "path_to_dodge_audio.mp3"
    },
    {
        word: "fudge",
        jumbled: jumbleWord("fudge"),
        audio: "path_to_fudge_audio.mp3"
    },
    {
        word: "age",
        jumbled: jumbleWord("age"),
        audio: "path_to_age_audio.mp3"
    },
    {
        word: "huge",
        jumbled: jumbleWord("huge"),
        audio: "path_to_huge_audio.mp3"
    },
    {
        word: "change",
        jumbled: jumbleWord("change"),
        audio: "path_to_change_audio.mp3"
    },
    {
        word: "charge",
        jumbled: jumbleWord("charge"),
        audio: "path_to_charge_audio.mp3"
    },
    {
        word: "village",
        jumbled: jumbleWord("village"),
        audio: "path_to_village_audio.mp3"
    },
];

const WordList = () => {
    return (
        <div>
            {words.map((wordData, index) => (
                <div key={index}>
                    <p>Original: {wordData.word}</p>
                    <p>Jumbled: {wordData.jumbled}</p>
                    <audio controls src={wordData.audio}>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ))}
        </div>
    );
}

export default WordList;
