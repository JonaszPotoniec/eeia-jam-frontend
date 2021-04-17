import React from 'react';
import styles from '../styles/CreateEvent.module.scss'

const CreateEvent = () => {
    return (
        <div className={styles.createEvent}>
            <h1>Create event</h1>
            <div className={styles.container}>
                <form>
                    <h2>Create event</h2>

                    <label>
                        <span>Event name</span>
                        <input type="text"/>
                    </label>

                    <label>
                        <span>Event description</span>
                        <textarea type="text" rows={10} />
                    </label>

                    <label>
                        <span>Date</span>
                        <input type="date"/>
                    </label>

                    <button>Add event</button>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent
