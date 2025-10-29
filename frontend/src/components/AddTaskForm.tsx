import React, { useState } from 'react'


type Props = { onAdd: (desc: string) => void }


export default function AddTaskForm({ onAdd }: Props) {
const [desc, setDesc] = useState('')
const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
const t = desc.trim()
if (!t) return
onAdd(t)
setDesc('')
}


return (
<form onSubmit={handleSubmit} className="flex gap-2">
<input
value={desc}
onChange={e => setDesc(e.target.value)}
placeholder="Add new task..."
className="border rounded px-3 py-2 flex-1"
/>
<button className="px-4 py-2 rounded bg-slate-700 text-white">Add</button>
</form>
)
}