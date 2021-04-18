import React, { useState } from 'react';
import styles from '../styles/DetailsCard.module.scss';
import { motion, useAnimation } from 'framer-motion';

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
    const controls = useAnimation();

    const handleDragStart = (e, info) => {
        // setStartY(info.point.y);
    }

    const handleDragEnd = (e, info) => {
        if (Math.abs(startY - info.point.y) > 150) {
            console.log('offset > 100, closing card');
            // controls.start({ y: '-100vh' });

            // setTimeout(() => {
            //     close();
            // }, 300);
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
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                exit={{ y: '-100vh' }}
                drag
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={.1}
                // onDragStart={(e, info) => handleDragStart(e, info)}
                // onDragEnd={(e, info) => handleDragEnd(e, info)}
            >
                karta
            </motion.div>
        </>
    )
}

export default DetailsCard
