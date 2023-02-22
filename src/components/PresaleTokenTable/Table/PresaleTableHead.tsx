/* eslint-disable  react/jsx-props-no-spreading */

import React, { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import PresaleTableCellHead from "./PresaleTableCellHead";

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
  ...draggableStyle,
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  background: isDragging ? "#33CC66" : "",
  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" }),
});

const PresaleTableHead = ({
  allColumns,
  headerGroups,
  setColumnOrder,
  onHeaderClick,
}): JSX.Element => {
  const currentColOrder = useRef(null);

  const onDragStart = () => {
    currentColOrder.current = allColumns.map((o) => o.id);
  };

  const onDragUpdate = (dragUpdateObj) => {
    const colOrder = [...currentColOrder.current];
    const sIndex = dragUpdateObj.source.index;
    const dIndex = dragUpdateObj.destination && dragUpdateObj.destination.index;

    if (typeof sIndex === "number" && typeof dIndex === "number") {
      colOrder.splice(sIndex, 1);
      colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
      setColumnOrder(colOrder);
    }
  };

  return (
    <div className="text-sm xl:text-base leading-4 text-text-primary dark:text-text-primary-dark">
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        {headerGroups.map((headerGroup) => (
          <Droppable
            droppableId="droppable"
            direction="horizontal"
            key={headerGroup.getHeaderGroupProps().key}
          >
            {(droppableProvided) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                ref={droppableProvided.innerRef}
                className="h-[4.125rem] w-full min-w-[100%] w-max"
              >
                {headerGroup.headers.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                    isDragDisabled={!column.accessor}
                  >
                    {(provided, snapshot) => (
                     <div className="pr-4 border-b border-bg-t-table-border">
                       <div
                         {...column.getHeaderProps()}
                         className="h-full text-center"
                       >
                         <div
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           ref={provided.innerRef}
                           style={{
                             ...getItemStyle(
                               snapshot,
                               provided.draggableProps.style
                             ),
                           }}
                           className="h-full p-2 flex items-center justify-start "
                         >
                           <PresaleTableCellHead
                             column={column}
                             onClick={column.id ? onHeaderClick : null}
                           />
                         </div>
                       </div>
                     </div>
                    )}
                  </Draggable>
                ))}

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default PresaleTableHead;
