import { useDrag } from 'react-dnd';

function DraggableLetter({ letter }) {
    const [{ isDragging }, drag] = useDrag({
        type: "LETTER",
        item: { letter },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <span ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {letter}
        </span>
    );
}

export default DraggableLetter;
