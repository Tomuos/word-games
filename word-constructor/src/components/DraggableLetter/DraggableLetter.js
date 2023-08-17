import { useDrag } from 'react-dnd';
import './DraggableLetter.css'

function DraggableLetter({ letter }) {
  const [{ isDragging }, drag] = useDrag({
    type: "LETTER",
    item: { letter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className="letter">
      {letter}
    </div>
  );
}



export default DraggableLetter;
