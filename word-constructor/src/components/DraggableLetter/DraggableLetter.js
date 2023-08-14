import DraggableLetter from './DraggableLetter';

function LetterPool({ letters }) {
    return (
        <div className="letter-pool">
            {letters.map((letter, index) => (
                <DraggableLetter key={index} letter={letter} />
            ))}
        </div>
    );
}


export default DraggableLetter;
