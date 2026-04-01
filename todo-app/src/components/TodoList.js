import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete, onReorder, onEdit }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const reordered = items.map((item, index) => ({
      id: item.id,
      order: index + 1,
    }));

    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;