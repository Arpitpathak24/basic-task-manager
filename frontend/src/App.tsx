import React, { useEffect, useState } from 'react'
import { fetchTasks, addTask, toggleTask, deleteTask, TaskItem } from './api'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'

type Filter = 'all' | 'active' | 'completed'

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<Filter>(() => (localStorage.getItem('filter') as Filter) || 'all')

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const saved = localStorage.getItem('tasks_v1')
        if (saved) {
          setTasks(JSON.parse(saved))
        }
        // Fetch from server and sync
        const remote = await fetchTasks()
        setTasks(remote)
        localStorage.setItem('tasks_v1', JSON.stringify(remote))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks_v1', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  const handleAdd = async (desc: string) => {
    setLoading(true)
    try {
      const created = await addTask(desc)
      setTasks(prev => [created, ...prev])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleTask(id)
      setTasks(prev => prev.map(p => (p.id === id ? updated : p)))
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(p => p.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.isCompleted : t.isCompleted
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Basic Task Manager</h1>

      <AddTaskForm onAdd={handleAdd} />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-slate-700 text-white' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-slate-700 text-white' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-slate-700 text-white' : ''}`}
        >
          Completed
        </button>
      </div>

      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-4 text-sm text-slate-600">
        Tasks are saved in server memory and localStorage for faster startup.
      </div>
    </div>
  )
}
