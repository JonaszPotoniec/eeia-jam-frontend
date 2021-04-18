import React, { useState } from 'react';
import styles from '../styles/DetailsCard.module.scss';
import { motion } from 'framer-motion';

// const cardVariants = {
//     initial: {
//         y: '-100vh'
//     }, 
//     animate: {
//         y: 0
//     },
//     exit: {
//         y: '100vh'
//     }
// }

const DetailsCard = ({ event, close }) => {
    const [startY, setStartY] = useState(null); 
    const [endY, setEndY] = useState(null); 

    const handleDragStart = (e, info) => {
        setStartY(info.point.y);
    }

    const handleDragEnd = (e, info) => {
        if (Math.abs(startY - info.point.y) > 150) {
            console.log('offset > 100, closing card');
            close();
        }
    }
    
    return (
        <>
            {/* <motion.div 
                className={styles.dimLayer} 
                initial={{ opacity: 0 }}
                animate={{ opacity: .4 }}
                exit={{ opacity: 0 }}
                key="dimLayer"
            /> */}

            <motion.div 
                className={styles.card}
                // initial={{ y: '100vh' }}
                // animate={{ y: 0 }}
                exit={{ y: '-100vh' }}
                // variants={cardVariants}
                // initial="initial"
                // animate="animate"
                // exit="exit"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={.1}
                onDragStart={(e, info) => handleDragStart(e, info)}
                onDragEnd={(e, info) => handleDragEnd(e, info)}
                key="card"
            >
                karta
            </motion.div>
        </>
    )
}

export default DetailsCard
