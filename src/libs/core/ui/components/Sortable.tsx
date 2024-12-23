import React, { useState, useEffect } from 'react';
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
	type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
	useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { IconButton } from '..';
import { ProfilePic } from '@/users';
import { ActionType } from '@/core/data';

type SortableItem = React.ReactElement<{ id: string & Record<string, any>}>;

interface SorteableProps {
	children: SortableItem[];
  items: (string | { id: string })[];
  updateOrder: (order: (string | { id: string })[]) => void;
  startMoving?: (item: string | { id: string }) => void;
  finishMoving?: (item: string | { id: string }) => void;
}

export const Sorteable = ({ items, updateOrder, startMoving, finishMoving, children }: SorteableProps) => {
  const [orderedItems, setOrderedItems] = useState(items);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

	const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );
  const modifiers = [restrictToVerticalAxis, restrictToParentElement];

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    if (finishMoving) {
      finishMoving(active.id);
    }
    
    const activeIndex = orderedItems.findIndex((item) => typeof item === 'string' ? item === active.id : item.id === active.id);
    const overIndex = orderedItems.findIndex((item) => typeof item === 'string' ? item === over.id : item.id === over.id);
    
    const newOrder = arrayMove(items, activeIndex, overIndex);

    updateOrder(newOrder);
  };

  const handleDragStart = ({ active }) => {
    if (startMoving) {
      startMoving(active.id);
    }
  };

	return (
		<DndContext
			sensors={sensors}
			modifiers={modifiers}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{React.Children.map(children, (child, i) => (
					<SortableItem
            key={child.props.id}
            id={child.props.id}
            movingUser={items[i].moving}
          >
            {child}
          </SortableItem>
				))}
			</SortableContext>
		</DndContext>
	);
};

interface SortableItemProps {
	id: UniqueIdentifier;
  movingUser: string | undefined;
	children: React.ReactElement;
}

const SortableItem = ({ id, movingUser, children }: SortableItemProps) => {
  const {
    setNodeRef,
    isDragging,
    listeners,
		attributes,
    transform,
    transition,
  } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
				zIndex: isDragging ? 1 : undefined,
				opacity: isDragging ? 0.75 : 1,
				position: isDragging ? 'relative' : undefined,
      }}
			{...attributes}
		>
			{/* Clone the child and add the group class and Move Icon Button inside */}
      {React.cloneElement(children, {
        ...children.props,
        className: `${children.props.className || ''} relative group`,
        children: (
          <>
            <IconButton.Drag
              {...listeners}
              className="absolute top-4 left-0 hidden group-hover:block text-white/70 !cursor-grab"
							size={4}
            />

            {children.props.children}

            {movingUser && (
              <div className="absolute -top-4 right-4">
                <ProfilePic user={movingUser} realtimeIndicator={ActionType.Move} />
              </div>
            )}
          </>
        ),
      })}
    </div>
  );
};
