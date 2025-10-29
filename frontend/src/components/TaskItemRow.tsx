import React from 'react'
import { TaskItem } from '../api'


type Props = {
t: TaskItem
onToggle: (id: string) => void
onDelete: (id: string) => void
}


export default function TaskItemRow({ t, onToggle, onDelete }: Props) {
return (
<div className="flex items-center justify-between gap-4 p-2 border-b">
<label className="flex items-center gap-3">
<input type="checkbox" checked={t.isCompleted} onChange={() => onToggle(t.id)} />
<span style={{ textDecoration: t.isCompleted ? 'line-through' : undefined }}>{t.description}</span>
</label>
<div>
<button onClick={() => onDelete(t.id)} className="text-sm px-2 py-1 rounded bg-red-600 text-white">Delete</button>
</div>
</div>
)
}