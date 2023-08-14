import { useDrop } from 'react-dnd';

function BoardSpot({ onDropLetter }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "LETTER",
        drop: (item) => onDropLetter(item.letter),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={drop} style={{ background: isOver ? 'lightblue' : 'white' }}>
            {/* This will show the letter once it's dropped or can be empty */}
        </div>
    );
}

export default BoardSpot;
