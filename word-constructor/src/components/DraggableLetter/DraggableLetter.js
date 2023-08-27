import { useDrag } from 'react-dnd';
import './DraggableLetter.css';

function DraggableLetter({ letter }) {
  const [{ isDragging }, drag] = useDrag({
    type: "LETTER",
    item: { letter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Add dynamic class based on the letter
  const tileClass = `letter-${letter.toUpperCase()}`;

  return (
    <div ref={drag} 
         style={{ opacity: isDragging ? 0.5 : 1 }} 
         className={`letter ${tileClass}`}>
      {letter}
    </div>
  );
}

export default DraggableLetter;
