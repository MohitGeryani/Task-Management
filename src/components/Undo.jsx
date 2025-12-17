
import { useTasks } from '@/context/TaskContext';
import React from 'react'



const abortDeletef = () => {
    abortDeletef(true)
}



const Undo = ({task}) => {

    
    // const {  undoTask } = useTasks();



     
  return (
    
    <div onClick={abortDeletef} >

        Undo

        
    </div>


)
}

export default Undo