/* eslint-disable  react/jsx-props-no-spreading */

import React, { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import TokenTableCellHead from "./TokenTableCellHead";

/* const DexTableHead = ({ onSort }: { onSort: (isDesc) => void }) => {
  const [isDesc, setIsDesc] = useState(true);

  const handlerClick = () => {
    setIsDesc((prevState) => !prevState);
  };

  useEffect(() => onSort(isDesc), [isDesc]);

  return (
    <div className="h-[66px] flex flex-row justify-between items-center text-base leading-[16.8px] text-white border-y border-[#313135]">
      <div className="px-2 w-[75px]">&nbsp;</div>
      <div className="px-2 w-[5%]">Pair</div>
      <div className="px-2 w-[10%]">Listed Since</div>
      <div className="px-2 w-[10%]">Price</div>
      <div className="px-2 w-[8%]">
        <span className="border rounded p-2 border-[#6E6E6E]">
          <span className="pr-2" onClick={handlerClick}>
            <FontAwesomeIcon
              icon={isDesc ? faAngleDown : faAngleUp}
              className="h-3 w-3 text-gray-400"
            />
          </span>
          % 24h
        </span>
      </div>
      <div className="px-2 w-[10%]">Total Liquidity</div>
      <div className="flex flex-row items-center gap-1 px-2 min-w-[200px]">
        Pool Remaining
        <Tooltip
          title="Pool Remaining"
          message="Pool Remaining ........."
          icon
        />
      </div>
      <div className="flex flex-row items-center gap-1 px-2 w-[8%]">
        Pool Variation
        <Tooltip
          title="Pool Variation"
          message="Pool Variation ........."
          icon
        />
      </div>
      <div className="flex flex-row items-center gap-1 px-2 w-[10%]">
        Market Cap
        <Tooltip title="Market Cap" message="Market Cap ........." icon />
      </div>
      <div className="w-[10%]">&nbsp;</div>
    </div>
  );
}; */

const getItemStyle = ({ isDragging, isDropAnimating }, draggableStyle) => ({
  ...draggableStyle,
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  background: isDragging ? "#33CC66" : "",
  ...(!isDragging && { transform: "translate(0,0)" }),
  ...(isDropAnimating && { transitionDuration: "0.001s" }),
});

const TokenTableHead = ({
  allColumns,
  headerGroups,
  setColumnOrder,
  onHistoryChange,
  onHistoryGraphChange,
}): JSX.Element => {
  const currentColOrder = useRef(null);

  const onDragStart = () => {
    currentColOrder.current = allColumns.map((o) => o.id);
  };

  const onDragUpdate = (dragUpdateObj, b) => {
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
                className="h-[4.125rem] w-full border-b border-bg-t-table-border min-w-[100%]"
              >
                {headerGroup.headers.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                    isDragDisabled={!column.accessor}
                  >
                    {(provided, snapshot) => (
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
                          className="h-full p-2 flex items-center justify-start"
                        >
                          <TokenTableCellHead
                            column={column}
                            onHistoryChange={column.id ? onHistoryChange : null}
                            onHistoryGraphChange={
                              column.id ? onHistoryGraphChange : null
                            }
                          />
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

export default TokenTableHead;
