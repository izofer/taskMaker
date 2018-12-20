class TaskMaker
{

	constructor(el)
	{
		console.log('constructor')

		this.dataNewTask = JSON.parse(localStorage.getItem('task')) || new Array()
		this.dataOldTask = JSON.parse(localStorage.getItem('taskOld')) || new Array()

		this.textField = document.getElementById('textBox')
		this.btnTask   = document.querySelector('#btnTask')
		this.btnClean  = document.querySelector('#btnClean')
		this.myNewList = document.getElementById('myNewList')
		this.myOldList = document.getElementById('myOldList')

		this.delete;

		this.events()
		this.addTaskDom()
	}
	
	events(ev)
	{
		if(this.dataNewTask.length > 0)
		{
			this.addTaskDom()
		}

		const $btnTask  = this.btnTask
		const $btnClean = this.btnClean

		$btnTask.addEventListener('click',() => {
			this.boxHelp1(this.textField)
		})

		$btnClean.addEventListener('click',() => {
			this.desctuctor()
		})
	}

	//HELPERS
	boxHelp1(el)
	{
		const $textField = el.value

		this.dataNewTask.push($textField)
		localStorage.setItem('task',JSON.stringify(this.dataNewTask))
		this.dataNewTask = JSON.parse(localStorage.getItem('task'))

		this.addTaskDom()
	}
	//END HELPER

	addTaskDom(ev)
	{
		let node
		let nodex
		let textNode
		let value
		let classs

		this.myNewList.innerHTML = ''

		for(let i = 0; i < this.dataNewTask.length; i++)
		{	
			node      = document.createElement('li')
			nodex     = document.createElement('label')

			textNode  = document.createTextNode(this.dataNewTask[i])
			value     = document.createAttribute('value')
			classs    = document.createAttribute('class')

			nodex.setAttributeNode(value);
			nodex.setAttribute('value', i)

			nodex.setAttributeNode(classs);
			nodex.className = 'del'

			node.appendChild(textNode)
			node.appendChild(nodex)

			this.myNewList.appendChild(node)
		}


		if( (this.dataOldTask.length > 0) || (this.dataNewTask.length <= 0))
		{	
			this.myOldList.innerHTML = ''

			for(let i = 0; i < this.dataOldTask.length; i++)
			{	
				node      = document.createElement('li')

				textNode  = document.createTextNode(this.dataOldTask[i])
				value     = document.createAttribute('value')
				classs    = document.createAttribute('class')

				node.appendChild(textNode)

				this.myOldList.appendChild(node)
			}
		}

		this.textField.value = ''

		this.newButtons()
	}

	newButtons(el)
	{
		let $delete   = this.delete

		$delete = document.querySelectorAll('.del')

		for(let i = 0; i < $delete.length; i++)
		{
			$delete[i].addEventListener('click',() => {
				let index = $delete[i].getAttribute('value')
				this.deleteData(index,this.dataNewTask)
			})
		}
	}

	deleteData(index,data)
	{	
		
		let deleteData = JSON.parse(localStorage.getItem('task'))

			this.dataOldTask.push(deleteData[index])
			localStorage.setItem('taskOld',JSON.stringify(this.dataOldTask))
			this.dataOldTask =JSON.parse(localStorage.getItem('taskOld'))

			deleteData.length > 0 ? deleteData.splice(index,1) : deleteData.splice(index,0)
			localStorage.setItem('task',JSON.stringify(deleteData))
			this.dataNewTask = JSON.parse(localStorage.getItem('task'))	

			this.addTaskDom()
	}

	desctuctor()
	{
		this.myNewList.innerHTML = ''
		this.myOldList.innerHTML = ''
		this.textField.value = ''
		localStorage.setItem('task',null)
		localStorage.setItem('taskOld',null)
		this.dataNewTask = JSON.parse(localStorage.getItem('task')) || new Array()
		this.dataOldTask = JSON.parse(localStorage.getItem('taskOld')) || new Array()
	}

}

const taskMaker = new TaskMaker();