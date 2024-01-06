
const ToDoAppMobile = () => {

    return (
      <div className="app" style={{width: "95vw", margin: "0 auto"}}>
      
      <h1 className="text-center superbold underliner mt-3" style={{color: "navyblue"}}>Todo App</h1>
      <Tabs defaultActiveKey="mobile_main" id="mobile_app" className="mt-5" fill>

      <Tab eventKey="mobile_main" title="Home 🏠">
      <ToDoInputMobile addTask={addTask}/>
     
      <hr></hr>
      
      

      <ToDoOutput toDoList={toDoList} counter={counter} toggleTask={toggleTask}/>
      <ClearTasksButton removeTasks={removeTasks}/>

      <p className="my-2 ml-2" style={{textAlign: "right"}}>{currentDateTime}</p>
      </Tab>

      <Tab eventKey="mobile_advanced" title="Advanced ⚙️">

      <TagFilterMobile filterTasks={filterTasks}/>


      <ToDoPresetTitle></ToDoPresetTitle>
      <ToDoPresetList addMultipleTasks={addMultipleTasks} presets={presetData}></ToDoPresetList>
      <SaveToDoPreset addPreset={addPreset} removePreset={removePreset} />

      </Tab>

      <Tab eventKey="mobile_statistics" title="Statistics 📈">
      
      <ToDoStatistics data={statisticsData} clearStatistics={clearStatistics} clearStatistics_history={clearStatistics_history} taskLog={toDoListHistory}/>


      </Tab>
      </Tabs>
    </div>
    )

}

export default ToDoAppMobile;