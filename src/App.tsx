import {FormEvent, useState, useEffect} from 'react';
import { doc, setDoc, collection, addDoc, getDocs, deleteDoc} from "firebase/firestore";
import { db } from './firebase';

function App() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [greetings, setGreetings] = useState("");


  
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const form ={
      title,
      description
    }

    if(!edit){
      await addDoc(collection(db, "crud"),form)
    }else{
      await setDoc(doc(db, "crud", id), form);
      setEdit(false);
    }

    setId('');
    setTitle('');
    setDescription('');
    getDocuments();
  }


  function handleEdit(id: string, title: string, description: string){
    setId(id);
    setTitle(title);
    setDescription(description);
    setEdit(true);
  }

  async function handleDelete(id: string){
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteDoc(doc(db, "crud", id));
      console.log('Note deleted');
    } else {
      console.log('Action cancelled');
    }

    getDocuments();
  }

  async function getDocuments(){
      const querySnapshot =  await getDocs(collection(db, "crud"));
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          data: doc.data()
        }
        setDocuments((documents: any[]) => [...documents, data]);
      });
    }


  useEffect(() => { 
    getDocuments();
    
    // Create grettings based on daytime
    const dayTime = (new Date()).getHours();
    if(dayTime < 12 && dayTime > 5){
      setGreetings("buenos días.")
    } else if(dayTime > 12 && dayTime < 18) {
      setGreetings("buenas tardes.")
    } else {
      setGreetings("buenas noches.")
    }
  },[])

  return (
    <div className="App">
      <header className="flex bg-indigo-600 text-white flex-row items-center justify-between shadow-lg px-6 py-6 tracking-widest">
        <p className="text-xl font-semibold">
          React Notes
        </p>
        <p>
          Hola, {greetings}
        </p>
      </header>
      <main className="bg-indigo-50 flex flex-col p-12 space-y-8">
        <div className="bg-white text-gray-700 shadow-md text-xl rounded-md px-8 py-4 w-full">
          
          <h3 className="text-2xl font-semibold mb-6">
            Add new note
          </h3>
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="space-y-8">
              <div>
                <label htmlFor="title" className="mr-2">
                  Title:
                </label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full border border-gray-300 px-2 py-1 rounded-md focus:ring focus:ring-indigo-500" />
              </div>
              <div className="">
                <label htmlFor="description" className="mr-2">
                  Description:
                </label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full border border-gray-300 px-2 py-1 rounded-md focus:ring focus:ring-indigo-500" />
              </div>
            </div>

            <div className="flex items-center justify-end py-6 space-x-4">
              <button className="bg-red-600 px-4 py-2 w-28 rounded-md text-white hover:bg-red-700">
                Cancel
              </button>
              <button type="submit" className="bg-green-700 px-4 py-2 w-28 rounded-md text-white hover:bg-green-800">
                Save
              </button>
            </div>

          </form>
        </div>

        <section className="text-gray-700">
          <h1 className="text-2xl font-semibold tracking-widest">
            List of notes
          </h1>
          <div className="px-4 mt-2 space-y-4">

           {
              documents.map((data: any, key: number) => (
                <div key={"note-card"+key} className="bg-gray-50 border border-indigo-500 shadow-md rounded-md py-6 px-8 w-full">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold">
                        {data.data.title}
                      </p>
                      <p>
                        {data.data.description}
                      </p>
                    </div>
                    <div className="ml-28 flex flex-row space-x-4">
                      <button onClick={() => handleDelete(data.id)} className="flex items-center w-28 text-lf font-semibold bg-red-600 px-3 py-1 h-12 rounded-md text-white hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" />
                        </svg>
                        <span className="ml-2">
                          Delete
                        </span>
                      </button>
                      <button onClick={() => handleEdit(data.id, data.data.title, data.data.description) } className="flex items-center w-28 text-lf font-semibold bg-blue-600 px-3 py-1 h-12 rounded-md text-white hover:bg-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" className="h-6 w-6" fill="currentColor">
                          <path d="M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z" />                
                        </svg>
                        <span className="ml-2">
                          Edit
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
          
        </section>
      </main>
    </div>
  );
}

export default App;
