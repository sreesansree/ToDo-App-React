import React, { useState } from 'react';
import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { FiEdit } from 'react-icons/fi';

export function Task({ task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  };

  return (

    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      {isEditing ? (
        <div className={styles.editContainer}>
          <input
          className={styles.textCompleted}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button className={styles.saveButton} onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ""}>{task.title}</p>
      )}

      <button className={styles.editButton} onClick={handleEditClick}>
        <FiEdit size={20} />
      </button>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  )
}