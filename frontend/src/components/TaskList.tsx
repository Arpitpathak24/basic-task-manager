import React from 'react'
import TaskItemRow from './TaskItemRow'
import { TaskItem } from '../api'


type Props = {
tasks: TaskItem[]
onToggle: (id: string) => void
onDelete: (id: string) => void
}


export default function TaskList({ tasks, onToggle, onDelete }: Props) {
if (tasks.length === 0) return <div className="p-4">No tasks yet</div>
return (
<div className="border rounded">
{tasks.map(t => (
<TaskItemRow key={t.id} t={t} onToggle={onToggle} onDelete={onDelete} />
))}
</div>
)
}