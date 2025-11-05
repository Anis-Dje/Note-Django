import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
                setTitle("");
                setContent("");
            })
            .catch((err) => alert(err));
    };

    const logout = () => {
        try {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            if (api?.defaults?.headers?.common) {
                delete api.defaults.headers.common["Authorization"];
            }
        } catch (err) {
            console.warn("Logout cleanup error", err);
        }
        navigate("/login");
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>My Notes</h1>
            </header>

            <section className="notes-section">
                <h2>Notes</h2>
                {notes.length === 0 ? (
                    <p>No notes yet. Create one below!</p>
                ) : (
                    notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                )}
            </section>

            <div className="form-card">
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <input type="submit" value="Submit" />
                </form>
            </div>

            <footer className="home-footer">
                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
            </footer>
        </div>
    );
}

export default Home;