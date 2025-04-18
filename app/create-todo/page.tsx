'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateTodo = () => {

  const router = useRouter()

  const notifyError = () => toast.error("Veuillez remplir tous les champs !")
  const notifySuccess = () => toast.success("Tâche créée avec succès", {
    onClose: () => {
      router.push('/todos')
    }
  })

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title || !date) {
      notifyError()
      return
    }

    setIsDisabled(true);

    const response = await fetch('/api/create-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        date
      })
    })

    if(response.ok) {
      notifySuccess()
    } else {
      alert('Erreur lors de la création de la tâche !')
    }

  }


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <form className="form" onSubmit={handleCreateTodo}>
        <div className="title">
          <h1>Créer une tâche</h1>
        </div>
        <div className="align-horizontal">
          <div className="todo-container">
            <label className="placeholder">Tâche</label>
            <input 
              className="input"
              type="text"
              value={title}
              placeholder="Indiquez une tâche"
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="date-container">
            <label className="placeholder">Date</label>
            <input 
              className="input"
              type="date"
              value={date}
              placeholder="Indiquez une date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="button-container">
          {
            !isDisabled && <button type="submit" className="btn-success">Créer</button>
          }
        </div>
      </form>
    </>
  )
}

export default CreateTodo