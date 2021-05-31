const tasksEL = document.querySelector('#tasks')
const loadingEl = document.querySelector('#loading')
let loading = false

//  fetch data from backend
const getTasksFromBackend = async () => {
    loading = true
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    loading = false
    return data
}

// add data to DOM
const addTasksToDom = async () => {
    const tasks = await getTasksFromBackend()
    if (!loading) {
        loadingEl.innerHTML = ''
    }

    tasks.forEach(task => {
        const div = document.createElement('div')
        div.className = "task"
        div.innerHTML = `
            <h3>${task.Name}</h3>
            <ul>
                <li><strong>Due Time: </strong> ${task.DueTime}</li>
                <li><strong>Type: </strong> ${task.Type}</li>
            </ul>
            <div class="tags">
                <strong>${task.Tags}</strong>
                <span>${task.Completed && 'Completed' || 'Not Completed'}</span>
            </div>
        `
        tasksEL.appendChild(div)
    });
}

addTasksToDom()