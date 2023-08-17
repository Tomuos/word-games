import { useDrop } from 'react-dnd';

function BoardSpot({ onDropLetter }) {
    const [{ isOver }, drop, item] = useDrop({
        accept: "LETTER",
        drop: (item) => {
            onDropLetter(item.letter);
            return { id: item.id };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            item: monitor.getItem(),
        }),
    });

    return (
        <div ref={drop} style={{ background: isOver ? 'lightblue' : 'white' }}>
            {isOver && item && <div className="letter">{item.letter}</div>}
        </div>
    );
}

export default BoardSpot;

