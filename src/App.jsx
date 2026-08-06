import { useLoaderData } from 'react-router';
import './App.css'
import Footer from './sections/footer'
import Header from './sections/header'
import Main from './sections/main'

function App() {  
    const { inputs, output } = useLoaderData();

  const displayOutput = output && output.trim() !== '' 
    ? output 
    : 'Draft not generated yet.';

    const displayInput = inputs.length !== 0
    ? inputs 
    : 'You have mentioned no tasks as per now.';
  return (
    <>
        <Header />
          <Main displayOutput={displayOutput} displayInput={displayInput}/>
        <Footer />
    </>
  )
}

export default App
