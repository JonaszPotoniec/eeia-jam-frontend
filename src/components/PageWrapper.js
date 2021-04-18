import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LocationContext } from '../contexts/LocationContext';

const pageVariants = {
    initial: diff => ({
        x: diff > 0 ? '-100vw' : '100vw'
    }), 
    animate: {
        x: 0, 
    },
    exit: diff => ({
        x: diff > 0 ? '100vw' : '-100vw',
    })
}

const PageWrapper = ({ children, index }) => {
    const { animationDirection } = useContext(LocationContext);

    return (
        <motion.div
            key={index}
            style={{ height: '100%' }}
            variants={pageVariants}
            transition={{ duration: .3 }}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={animationDirection}
        >
            {children}
        </motion.div>
    )
}

export default PageWrapper
