import Worker from '/worker.js'
//Массив сотрудников
const workers = [
    new Worker('Вася', 'Пупкин', 'Анатольевич', '2011', new Date (1992, 2, 21), 'Ведущий специалист-эксперт'),
    new Worker('Джеки', 'Чан', 'Георгиевич', '2021', new Date (1998, 4, 11), 'Главный инженер'),
    new Worker('Михаил', 'Зубенко', 'Петрович', '2001', new Date (1987, 1, 23), 'Грузчик'),
]
const $workersList = document.getElementById('workersList'),
      $workersListTHAll = document.querySelectorAll('.workersTable th')
let column = 'fio',
    columnDir = true
// Получить TR сотрудика
function newWorkerTR(worker){
    const $workerTR = document.createElement ('tr'),
        $fioTD = document.createElement ('td'),
        $birthDateTD = document.createElement ('td'),
        $workStartTD = document.createElement ('td'),
        $postTD = document.createElement ('td')

    $fioTD.textContent = worker.fio
    $birthDateTD.textContent = worker.getBirthDateString() + ' (' + worker.getAge() + ')лет'
    $workStartTD.textContent = worker.workStart + ' (' + worker.getWorkPeriod() + 'лет)'
    $postTD.textContent = worker.post 

    $workerTR.append($fioTD)
    $workerTR.append($birthDateTD)
    $workerTR.append($workStartTD)
    $workerTR.append($postTD)
    
    return $workerTR;
}
// Получить сортировку массива по параметрам
function getSortWorkers(prop, dir) {
    const workersCopy = [...workers]
    return workersCopy.sort(function(workerA, workerB){
        if ((!dir == false ? workerA[prop] < workerB [prop] :  workerA[prop] > workerB [prop]))
        return -1;
    })
}
// Отрисовать
function render() {
    let workersCopy = [...workers]

    workersCopy = getSortWorkers(column, !columnDir)
    $workersList.innerHTML =  ''
    for (const worker of workersCopy) {
        $workersList.append(newWorkerTR(worker))
    }
}
// События сортировки
$workersListTHAll.forEach(element => {
    element.addEventListener ('click', function() {
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
} )
// Добавление
document.getElementById('add-worker').addEventListener('submit', function(event) {
    event.preventDefault()
    workers.push(new Worker(
        document.getElementById('input-name').value,
        document.getElementById('input-surname').value,
        document.getElementById('input-lastname').value,
        Number(document.getElementById('input-workStart').value),
        new Date(document.getElementById('input-birthDate').value),
        document.getElementById('input-post').value,
    ))
    render()
})
render()