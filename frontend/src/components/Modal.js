import React, { useState } from 'react'
import axios from '../axios';
import './Modal.css'

export default function Modal({ open, children, onclose }) {
    const[lang, setLang] = useState("");
    const[capacity, setCapacity] = useState("");
    const[input, setInput] = useState("");
    if (!open) return null

    const createRoom = async(e) => {
        e.preventDefault();
    
        await axios.post('/newroom', {
            "name": input,
            "lang": lang,
            "capacity": capacity
        });

        // console.log(input, capacity, lang);

        setCapacity('')
        setLang('')
        setInput('');
        onclose();
    }

    // console.log(lang)
    // console.log(capacity)
    // console.log(input);
    return (
        <>
            <div className="overlay" />
            <div className="modal">
                <div className="modal_top">
                    <div className="model_top_left">
                        <p>Topic</p>
                        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Any topic"/>
                    </div>
                    <div className="model_top_right">
                        <p>Maximum People</p>
                        <select value={capacity} onChange={e => setCapacity(e.target.value)}>
                            <option value="unlimited">Unlimited</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="modal_bottom">
                    <p>Language</p>
                    <select value={lang} onChange={e => setLang(e.target.value)}>
                        <option value="" disabled selected hidden>Select a language</option>
                        <option value="English">English</option>
                        <option value="Korean">Korean</option>
                        <option value="Sinhala">Sinhala</option>
                        <option value="Javanese">Javanese</option>
                        <option value="Chinese">Chinese</option>
                        <option value="5">Hindi</option>
                    </select>
                </div>

                <div className="modal_button">
                    <button onClick={onclose}>cancel</button>
                    <button onClick={createRoom}>create</button>
                </div>

                {children}
            </div>
        </>
    )
}
