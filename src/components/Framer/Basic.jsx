import React from 'react'
import { motion } from "motion/react"
// import { Link } from "re"
const Basic = () => {
  return (
    <motion.div className='bg-purple-600  h-screen'>

      <motion.h2 animate={{ fontSize: 10, x: 100, y: 200, color: "#ff2994" }}>Welcome to Framer-Motion</motion.h2>

      <motion.button className='border' animate={{ scale: 1.5 }}>Create your own pizza</motion.button>

    </motion.div>
  )
}

export default Basic
