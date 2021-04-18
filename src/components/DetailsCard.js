import React, { useState, useEffect } from 'react';
import styles from '../styles/DetailsCard.module.scss';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const DetailsCard = ({ event, close }) => {
    const [animateY, setAnimateY] = useState(0);
    const [pointerEvents, setPointerEvents] = useState('all')
    const [endY, setEndY] = useState(null); 
    const y = useMotionValue(0);
    const opacity = useTransform(y, [-800, 0, 800], [0, .4, 0]);

    useEffect(() => {
        if (event) {
            setAnimateY(0);
            setPointerEvents('all');
        }
    }, [event]);

    const handleDragEnd = (e, info) => {
        console.log(info);
        if (info.offset.y > 250) {
            setAnimateY(800);
            setPointerEvents('none');
            setTimeout(() => {
                close();
            }, 200);
        }

        if (info.offset.y < -250) {
            setAnimateY(-800);
            setPointerEvents('none');
            setTimeout(() => {
                close();
            }, 200);
        }
    }
    
    return (
        <>
            <motion.div 
                className={styles.dimLayer} 
                style={{ opacity, pointerEvents }}
            />

            <motion.div 
                className={styles.card}
                style={{ y, pointerEvents }}
                animate={{ y: animateY }}
                transition={{ type: 'spring', duration: .2, stiffness: 150, damping: 17 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={.1}
                onDragEnd={(e, info) => handleDragEnd(e, info)}
            >
                karta
            </motion.div>
        </>
    )
}

export default DetailsCard
