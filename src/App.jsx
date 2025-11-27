import './App.css'
import Navbar from './components/Navbar.jsx'
import TaskWindow from './components/tasks/TaskWindow';

function App() {
  return (
    <>
      <Navbar />

      {/* MAIN WRAPPER */}

<div className="flex justify-center pt-14 md:ml-10 pl-4 pr-0 w-full! md:pt-10 max-w-full  overflow-x-visible">
 
       

        <TaskWindow />
      </div>


        {/* Decorative Background  */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-10 left-5 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-400/20 rounded-full blur-2xl sm:blur-3xl"></div>
          <div className="absolute top-20 right-5 sm:right-20 w-24 h-24 sm:w-40 sm:h-40 bg-amber-300/15 rounded-full blur-2xl sm:blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-amber-400/10 rounded-full blur-2xl sm:blur-3xl"></div>
        </div>


     


     
    </>
  );
}

export default App;
