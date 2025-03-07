import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5006/api/todo"; 

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "Medium", category: "Personal" });
    const [searchQuery, setSearchQuery] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [filterCategory, setFilterCategory] = useState("All");

    // Fetch Todos
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error("Error fetching todos:", err));
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
    };

    // Add New Todo
    const addTodo = async () => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        });

        if (response.ok) {
            const newItem = await response.json();
            setTodos([...todos, newItem]);
            setNewTodo({ title: "", description: "", priority: "Medium", category: "Personal" });
        }
    };

    // Update Todo
    const updateTodo = async () => {
        const response = await fetch(`${API_URL}/${editingTodo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingTodo),
        });

        if (response.ok) {
            setTodos(todos.map(todo => (todo.id === editingTodo.id ? editingTodo : todo)));
            setEditingTodo(null);
        }
    };

    // Delete Todo
    const deleteTodo = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Handle Edit Click
    const startEditing = (todo) => {
        setEditingTodo(todo);
    };

    // Handle Update Input Change
    const handleEditChange = (e) => {
        setEditingTodo({ ...editingTodo, [e.target.name]: e.target.value });
    };

    // Filter and Sort Todos
    const filteredTodos = todos
        .filter((todo) => 
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterCategory === "All" || todo.category === filterCategory)
        )
        .sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return new Date(a.createDatetime) - new Date(b.createDatetime);
        });

    // Priority Colors
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High": return "bg-danger text-white";   
            case "Medium": return "bg-warning text-dark"; 
            case "Low": return "bg-success text-white";   
            default: return "bg-secondary text-white";
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Todo List</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mb-3"
            />

            {/* Category Filter Buttons */}
            <div className="mb-3">
                <button className="btn btn-secondary me-2" onClick={() => setFilterCategory("All")}>View All</button>
                <button className="btn btn-primary me-2" onClick={() => setFilterCategory("Work")}>View Work</button>
                <button className="btn btn-success" onClick={() => setFilterCategory("Personal")}>View Personal</button>
            </div>

            {/* Input Form */}
            <div className="mb-3">
                <input type="text" name="title" placeholder="Title" value={newTodo.title} onChange={handleChange} className="form-control" />
                <input type="text" name="description" placeholder="Description" value={newTodo.description} onChange={handleChange} className="form-control mt-2" />
                <select name="priority" value={newTodo.priority} onChange={handleChange} className="form-control mt-2">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select name="category" value={newTodo.category} onChange={handleChange} className="form-control mt-2">
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                </select>
                <button className="btn btn-primary mt-2" onClick={addTodo}>Add Todo</button>
            </div>

            {/* Display Todos */}
            <div className="mt-4">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center mb-2 ${getPriorityColor(todo.priority)}`} style={{ borderRadius: "8px", padding: "10px" }}>
                        <span>
                            <strong>{todo.title}</strong> - {todo.description} ({todo.category})
                        </span>
                        <div>
                            <button className="btn btn-light btn-sm me-2" onClick={() => startEditing(todo)}>✏️</button>
                            <button className="btn btn-dark btn-sm" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Todo Modal */}
            {editingTodo && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Todo</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingTodo(null)}></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" name="title" value={editingTodo.title} onChange={handleEditChange} className="form-control mb-2" />
                                <input type="text" name="description" value={editingTodo.description} onChange={handleEditChange} className="form-control mb-2" />
                                <select name="priority" value={editingTodo.priority} onChange={handleEditChange} className="form-control mb-2">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <select name="category" value={editingTodo.category} onChange={handleEditChange} className="form-control mb-2">
                                    <option value="Personal">Personal</option>
                                    <option value="Work">Work</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setEditingTodo(null)}>Cancel</button>
                                <button className="btn btn-success" onClick={updateTodo}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoApp;
